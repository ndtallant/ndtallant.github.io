"""Optional browser regression check. Run after pnpm build.
Requires: pip install playwright && playwright install chromium
"""
import subprocess
from playwright.sync_api import sync_playwright, expect

server = subprocess.Popen(
    ['python3', '-m', 'http.server', '3838', '--directory', 'out'],
    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
)
try:
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1440, 'height': 1000})
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto('http://localhost:3838/', wait_until='networkidle')
        assert page.locator('#hero').bounding_box()['height'] == 1000
        expect(page.locator('#writing, #thoughts, #contact')).to_have_count(0)
        expect(page.locator('a[href="#contact"], a[href="/#contact"]')).to_have_count(0)
        expect(page.locator('a[href="/blog"], a[href="#writing"], a[href="#thoughts"], a[href="/rss"]')).to_have_count(0)
        groups = page.locator('#resume h3').locator('..')
        # Read both columns in one frame so section animations cannot skew the comparison.
        columns = groups.evaluate_all('(elements) => elements.map(el => ({ x: el.getBoundingClientRect().x, y: el.getBoundingClientRect().y }))')
        assert columns[0]['y'] == columns[1]['y']
        assert columns[0]['x'] < columns[1]['x']
        resume_link = page.get_by_role('navigation').get_by_role('link', name='Resume', exact=True)
        resume_link.click()
        page.wait_for_timeout(100)
        target = page.locator('#resume').evaluate('(el) => el.getBoundingClientRect().top + scrollY')
        assert 0 < page.evaluate('scrollY') < target - 30, 'Scroll should animate, not jump'
        page.wait_for_timeout(1800)
        expect(resume_link).to_have_attribute('aria-current', 'location')
        expect(page.get_by_role('link', name='Back to top')).to_be_visible()
        page.get_by_role('link', name='Back to top').click()
        page.wait_for_timeout(1800)
        assert page.evaluate('scrollY') < 2
        for width in [320, 390, 768, 1024, 1440]:
            page.set_viewport_size({'width': width, 'height': 900})
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'Overflow at {width}'
        page.set_viewport_size({'width': 390, 'height': 844})
        page.get_by_role('button', name='Open navigation').click()
        resume_link.click()
        page.wait_for_timeout(1800)
        expect(page.get_by_role('button', name='Open navigation')).to_be_visible()
        assert groups.nth(1).bounding_box()['y'] > groups.nth(0).bounding_box()['y']
        page.get_by_role('button', name='Open navigation').click()
        page.keyboard.press('Escape')
        expect(page.get_by_role('button', name='Open navigation')).to_be_focused()
        page.emulate_media(reduced_motion='reduce', color_scheme='dark')
        page.reload(wait_until='networkidle')
        assert page.locator('html').evaluate('(el) => getComputedStyle(el).scrollBehavior') == 'auto'
        assert page.locator('[data-site="home"]').evaluate('(el) => getComputedStyle(el).colorScheme') == 'light'
        response = page.goto('http://localhost:3838/blog/', wait_until='networkidle')
        assert response.status == 404 or page.get_by_role('heading', name='404 - Page Not Found').is_visible()
        page.goto('http://localhost:3838/404.html', wait_until='networkidle')
        page.get_by_role('link', name='résumé', exact=True).click()
        page.wait_for_url('**/#resume')
        page.wait_for_timeout(400)
        assert abs(page.locator('#resume').bounding_box()['y']) < 50
        assert not errors, errors
        browser.close()
        print('PASS: scrolling, scrollspy, columns, mobile menu, back-to-top, cross-page anchors, hidden Thoughts, reduced motion, and overflow')
finally:
    server.terminate()
    server.wait()
