---
layout: default
permalink: /water-project
---

# Predicting Water Main Breaks in the City of Syracuse

#### Contributors
<a href="https://github.com/ndtallant">Nick Tallant</a> | <a href="https://github.com/vidal-anguiano">Vidal Anguiano</a> | <a href="https://github.com/lpwarner">Laurence Warner</a>

## Policy Motivations
The infrastructure for potable water in the United States is reaching the end of its life, resulting in almost a quarter of a million water main breaks per year. While the replacement and maintenance of infrastructure is inevitable, the excess costs and risks of water main breaks are not. Ideal preventative maintenance would save municipalities the cost of lost water, construction wages, and property damage while minimizing the disruption of public life for its residents. Replacing water mains before they break also avoids the public health crisis resulting from small unnoticed leaks, such as lead poisoning and other drinking water contamination.

However, implementing a preventative maintenance plan is not as straightforward as demonstrating its importance. Water mains break sporadically with no discernible pattern due to a variety of factors such as natural pipe corrosion, nearby construction, soil composition, sudden increases in water volume, and roadway activity. This leads to a reactive policy from municipalities, whose limited resources are saved to address the societal and economic costs described above. In contrast, public improvement projects - such as park renovations, revitalized retail storefronts, and transportation infrastructure improvements - are easier to assess visually and by the public, making these projects easier to prioritize.

A city that knows which water mains are at risk for breaking in the future can implement a proactive maintenance policy that works in parallel with other public infrastructure improvement projects, ultimately resulting in cost savings. Our project delivers a tool to help municipalities achieve these policy goals. Specifically,
* A machine learning pipeline for classifying city blocks as “at risk of a water main break” or “not at risk of a water main break” for the next one year, two years, and three years.
* A framework for choosing a course of action which based on the municipalities’ available resources and addressing at-risk water mains..
* A framework for visualizing at risk areas spatially.

These tools will be initially implemented for the city of Syracuse, but any city and its residents would benefit from the preventative maintenance made possible by this framework.

## Data and Sources
### Data for the City of Syracuse
The city provided data for its street geography, road conditions, water main conditions, and water system maintenance history. This was combined with data from the United States Geological Survey and tax parcel data to create the features outlined below.

### Population Density and Racial Demographic Data
Informed by the theoretical and empirical hypotheses that public infrastructure may be related to local demographics, we augmented our data with population density and racial demographic data from the U.S. Census American Community Survey (ACS).

Based on ACS 5-year Estimates, white residents comprise 51% of Syracuse residents, with black and asian residents making up 28% and 6%, respectively. We augmented our data with the following variables from the ACS 1-year Estimates for 2010 to 2015 at the block level: total population, population counts by race for white, black, asian, hawaiian and pacific islander, native american, two or more, and other.

## Methods
### Defining A Water Main Break and Generating Features
A city block was considered to have a water main break if a water main on that block received a work order containing “Main Break/Leak” in the time horizon of interest. There were not sufficient examples of other types of work orders, such as valve replacement and repair, for any other features to be generated from the work order data. These breaks were then aggregated to a city block. We created two groups of features from these data: the breaks on that block in the past 1-5 years and the breaks on nearby blocks in the last 1-6 years. Our output label, indicating a break within the next one, two, or three years, was also generated from these data.

As all predictions were for a main break on a city block, features of each water main, road segment, and geography needed to be aggregated and intentionally selected by a reasonable assumption. A buffer of 50 feet was created around every street in Syracuse to account for variance between the position of the streets and other sources of data. The largest intersection between a buffered street and the objects of interest outlined below formed the basis of all feature generation.

<img src="buffered_streets.png" alt="buffered streets" height="50%" width="50%" style="max-width:100%;">
<p align="center"><b>Figure 1:</b> City streets with a surrounding 50 ft. buffer.</p>

### Static Features
This method was used for geological features mapping the two most common rock types and the single most common soil taxonomy intersecting a city block.
Given a group of water mains aggregated to a city block, the oldest installation year, smallest diameter, and most used material on a given block were used to describe the mains on that block. Missing installation years were imputed from tax parcel records already mapped to city blocks. For 141 blocks we created aggregations for, we did not have corresponding data for installation year so we imputed the average installation year (1911) across all city blocks. While this method of imputation may differ from tax parcel data, this imputation consisted of less than 2% of the city blocks and is therefore unlikely to impact results. These imputations led to an additional feature of pipe age, created by subtracting the imputed installation year from the year the block is being observed in our models. The minimum pipe diameter per city block was chosen under the assumption that smaller pipes are associated with higher water pressure and consequently higher possibility of breaks.

Pipe material imputations were done three different ways under different sets of assumptions:

1. Missing values were imputed with the most frequent material in two time periods. For pipes installed after 1960 we imputed steel as the material, and pipes installed before 1960 we imputed cast iron.

2. The average installation year of each material motivated grouping lead and copper mains together, and imputing all missing values installed before 1900 as a unified group. High Density Polyethylene, culvert, and combination pipes were imputed into a new composite category. This led to larger groups of water mains amplifying installation year as a feature.

3. Using the assumption that steel pipes were being introduced in the 1940s, each main with a missing value between 1940 and 1960 had a thirty percent chance of being imputed as steel. Other pipes older than 1960 were imputed as cast iron, and pipes after 1960 were imputed as steel.

These three variations were combined with the geological features to make distinct sets of "static features" that do not change for a city block over time.

### Features That Change Over Time
Overall road condition was quantified on a ten point scale, with a zero being the worst and ten being the best. These road ratings were selected by the longest intersection with a city block, but changed with the year the city block was observed by the model. To ensure that a road rating was only mapped to a single street before block aggregation, a road rating needed to intersect at least 80% of the street it was mapped to. Aggregating without this step was not possible. As these values changed over time, missing values for each street were imputed with the average composite road rating of the observed year. Any missing values after aggregation were imputed with the average road rating of the training data set.

The work orders data was joined to itself such that each city block for each year between 2004 and 2015 had a cumulative count of the number of breaks for up to five years in the past.
This process was repeated for breaks within 300 feet, 500 feet, and half a mile of each city block.
Breaks a half mile away were not useful, but using breaks within 500 ft of any given break were often more predictive than just 300 ft away.

All of these features were combined into 9 distinct feature sets, each with the different assumptions and imputations outlined above. Every distinct feature set was tested with and without census data when applicable, in addition to testing without individual features.

### Population Density and Racial Composition of Blocks
In our dataset, we transformed each of the ACS 1-year Estimate variables to create population density and racial composition measures at the block level for each year of available ACS data (2010 - 2015). We transformed total population into a population density measure (people/square foot) using as the denominator the area calculated from Census 2010 shapefiles. For racial composition measures, each of the race variables were used to calculate race as a percentage of the population of each block.

To augment our dataset with these data, we performed spatial joins between Census 2010 block level shapefiles and city-provided street line files. We made the joins based on the highest amount of overlap between street segments and Census blocks. Furthermore, since we are representing blocks across time, we joined each block in each year to its corresponding year of ACS data.

<p align="center">
<a target="_blank" rel="noopener noreferrer" href="https://github.com/dssg/waterwedoing-mlpp2018/blob/master/report/images/population_density.png"><img src="./waterwedoing-mlpp2018_report at master · dssg_waterwedoing-mlpp2018_files/population_density.png" alt="population density" height="50%" width="50%" style="max-width:100%;"></a></p>
<p align="center"> <b>Figure 2:</b> Population density at the block level. Darker colors indicate more dense blocks.</p>

<p align="center">
<a target="_blank" rel="noopener noreferrer" href="https://github.com/dssg/waterwedoing-mlpp2018/blob/master/report/images/pct_black.png"><img src="./waterwedoing-mlpp2018_report at master · dssg_waterwedoing-mlpp2018_files/pct_black.png" alt="percent black" height="50%" width="47%" style="max-width:100%;"></a></p>
<p align="center"> <b>Figure 3:</b> Percent of the population that is black. Darker colors indicate a higher percentage of black residents.</p>


### Feature Importance
Past water main breaks were the greatest predictor of future breaks, with breaks in the past two years accounting for over a third of importance for one year predictions and over forty percent of three year predictions. The conditions of the roads on a city block were important for more immediate predictions, while the age of the mains themselves were important for a more distant prediction.

<div align="center">
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/dssg/waterwedoing-mlpp2018/blob/master/report/images/One_year_importance.png"><img src="./waterwedoing-mlpp2018_report at master · dssg_waterwedoing-mlpp2018_files/One_year_importance.png" alt="One year feature importance" height="60%" width="60%" style="max-width:100%;"></a>
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/dssg/waterwedoing-mlpp2018/blob/master/report/images/Three_year_importance.png"><img src="./waterwedoing-mlpp2018_report at master · dssg_waterwedoing-mlpp2018_files/Three_year_importance.png" alt="One year feature importance" height="60%" width="60%" style="max-width:100%;"></a>
</div>
<p align="center"> <b>Figure 4:</b> Feature importance for one and three year predictions.</p>

## Evaluation and Chosen Model</h2>
The model that performed the best across time periods was a K-Nearest Neighbors method using our lead-heavy material imputation, nearby breaks within 500 ft, K set to 5 (the 5 most similar city blocks), and a weighted distance metric between those similar blocks.

<p align="center">  
<a target="_blank" rel="noopener noreferrer" href="https://github.com/dssg/waterwedoing-mlpp2018/blob/master/report/images/best_knn.png"><img src="./waterwedoing-mlpp2018_report at master · dssg_waterwedoing-mlpp2018_files/best_knn.png" alt="KNN model" height="60%" width="60%" style="max-width:100%;"></a>


<p align="center"><b>Figure 5:</b> K-Nearest Neighbor Performance Summary.

When allocating resources to act on 1% of at-risk city blocks, our model correctly classifies those blocks 76% of the time.
The model also outperforms the baseline of 10% precision for the 2012 data we used to test the model. 
Aside from the KNN method, we also trained models using Logistic Regression, Decision Trees, Random Forests, Gradient Boosted Decision Trees, and Support Vector Machine. 
Neither of these methods performed as well nor as consistently as KNN.

### Validation
We validated our best model through two rounds of validation. In the first round, we did cross validation with 7 temporal holdout sets, each of them training on two years of data and testing on the year that followed. As shown in Figure 6 (below), the the 5-Nearest Neighbor method performed well across all 7 holdouts. Similarly, in our second round of validation we did cross validation with 6 temporal holdout sets, each of them training on three years of data and testing on the year that followed. In each of the holdout sets, the 5-Nearest Neighbor method also performed well across all holdouts. Of all the models we trained, 5-Nearest Neighbors performed the best when averaged across each of these temporal holdouts.

<p align="center">
<a target="_blank" rel="noopener noreferrer" href="https://github.com/dssg/waterwedoing-mlpp2018/blob/master/report/images/crossvalidation.png"><img src="./waterwedoing-mlpp2018_report at master · dssg_waterwedoing-mlpp2018_files/crossvalidation.png" alt="KNN crossvalidation" height="80%" width="80%" style="max-width:100%;"></a>


<p align="center"><b>Figure 6:</b> K-Nearest Neighbor Cross Validation Using 2-Year and 3-Year Temporal Holdouts..

### Performance With ACS Features
When we included features generated from Census data in our models, we found improvements in predictive performance only in models trained using the SVM method, while models using all other methods performed either equally or negligibly better. At 1% intervention level, including the Census features in SVM models improved precision by up to 25 percentage points when trained on two years of data and tested on one full year of data.

While including the ACS features does improve predictive performance using the SVM method, we do not include the ACS features in our final models. Since we only have ACS data from 2010-2015, and we are making predictions up to 3 years into the future, this effectively limits our training set to two years of data (2010-2011) as opposed to training models using up to 8 years of data (2004-2011). Furthermore, since we have comparatively more data outside of the 2010-2015 window, we are better able to validate our results for models trained on larger subsets of data compared to the one to two years of training data for models including ACS data. In the future, as more water break data are generated, using ACS data in model training can potentially improve predictive ability.

## Discussion</h2>
Based on our feature importance tests above (Figure 4) we discovered that breaks on the same block in the past are the strongest predictor of future breaks. Under the assumption that mains are replaced after leaks and breaks, it is puzzling that previous breaks would predict future breaks. However, since our data doesn't capture information about how the city responded to past breaks, whether a broken main was replaced or merely welded shut, it is unclear from the data why previous breaks are highly predictive of future breaks. Below is a crosstab demonstrating that blocks with past breaks were more likely to be have breaks in the future. The high chi-square value provides evidence that there is a strong difference between blocks that had previous breaks and those that did not.

Similarly, blocks with pipes the oldest pipe being more than 100 years old are also more likely to have future breaks. While the difference is significant with a p-value of .0004, the difference between blocks with the oldest pipes and those with the newest pipes is less stark compared to differences between blocks with 1 or more breaks and those with none.

<p align="center">
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/dssg/waterwedoing-mlpp2018/blob/master/report/images/crosstabs.png"><img src="./waterwedoing-mlpp2018_report at master · dssg_waterwedoing-mlpp2018_files/crosstabs.png" alt="Cross tabs." height="60%" width="60%" style="max-width:100%;"></a>

<p align="center"> <b>Figure 7:</b> Crosstabs for Past Breaks and Pipe Age on Breaks Within the Next 3 Years.


#### Policy Recommendations
The risk scores associated with each city block are not meant to prescribe a strict order of action. Rather, at-risk blocks should be closely monitored, prioritized within existing water system maintenance activities, and addressed when other projects are happening on a given block. Compared to the baseline of 10% precision or picking at random, our model should help the city better prioritize water mains to replace.

Sustaining our tool for future use will require continued data collection by the city, and we recommend the city's Water Department look to modern methods of data collection and storage. More reliable data from future breaks and maintenance will only improve our model which relies heavily on historical data.

## Limitations and Caveats</h2>
In future iterations, we would augment our analysis with socio-economic data to test whether socio-economic measures are predictive of near-future water main breaks. As is the case with racial demographic data, we did not include socio-economic data in our models due the limited temporal scope of ACS data. As an alternative, there may be organizations local to Syracuse or the State of New York that capture these data over a longer period of time.

For the problem we set out to solve, which was to predict which blocks were at risk of a main break, our model sufficiently provides a binary output to indicate whether a break or a leak is likely. However, other considerations, such as discerning which blocks are at risk for more severe breaks or multiple breaks, our model does not offer a solution to this problem formulation. In order to devise a solution that singles out blocks based on severity or quantity of breaks, two important factors need to be addressed; first, when breaks and leaks happen in the future, the city should devise a taxonomy of word orders that captures the relative difference between a small leak, a road cave-in, and the different types of main breaks that occur. Second, the problem would be formulated as a regression problem which could allow us to predict the quantity of breaks that are likely to occur on a block in a given time period.
