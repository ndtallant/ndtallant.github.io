export type ResumeEntry = {
  title: string
  period: string
  organization: string
  description: string
  highlights: string[]
}

export const experience: ResumeEntry[] = [
  {
    "title": "Senior Software Engineer",
    "period": "Current",
    "organization": "Recidiviz, Remote",
    "description": "Recidiviz is building a common, open-source, technical infrastructure to help the criminal justice system achieve better outcomes (both for the public and those within the system). With the right tools, we can surface earned releases for incarcerated people, prevent avoidable admissions, and reduce racial disparities.",
    "highlights": []
  },
  {
    "title": "Lead Software Engineer",
    "period": "March, 2023-October, 2023",
    "organization": "Omelas, Remote",
    "description": "",
    "highlights": [
      "Maintain the ingestion and ETL of hundreds of thousands of propaganda documents a day.",
      "Deploy and maintain machine learning models through REST APIs and containerized batching services.\n                      Models are fine tuned from HuggingFace transformers, PyTorch, and spaCy open source models.",
      "Directly manage and mentor other members of the team."
    ]
  },
  {
    "title": "Senior Data Engineer",
    "period": "2020-2022",
    "organization": "Omelas, Remote",
    "description": "Construct and maintain serverless data ingestion pipelines for global online propaganda, as well as deploy machine learning models into production for analysis of media.",
    "highlights": []
  },
  {
    "title": "Civic Innovation Fellow",
    "period": "2020",
    "organization": "US SOCOM, Washington D.C.",
    "description": "Created data science products for US Special Operations Command utilizing media of interest to special operations.",
    "highlights": []
  },
  {
    "title": "Geospatial Data Scientist",
    "period": "2019 - 2020",
    "organization": "UChicago Political Science, Chicago, IL",
    "description": "Created and combined spatial data concerning land reform policies in post-WWII Italy, and evaluated those policies through a spatial regression discontinuity design.",
    "highlights": []
  },
  {
    "title": "Data & Governance Fellow",
    "period": "2018 - 2019",
    "organization": "UChicago Consortium on School Research, Chicago, IL",
    "description": "Researched the implementation of Common Core State Standards within Chicago Public Schools by utilizing hierarchical linear modeling and a decade administrative data.",
    "highlights": []
  }
]

export const education: ResumeEntry[] = [
  {
    "title": "M.S. Computational Analysis & Public Policy",
    "period": "2017 - 2020",
    "organization": "University of Chicago, Chicago IL",
    "description": "A rigorous study of statistics, computer science, and economics to prepare policy-minded data scientists, civic technologists, and researchers.",
    "highlights": []
  },
  {
    "title": "B.S. Liberal Studies in Music & Science",
    "period": "2013 - 2017",
    "organization": "Texas A&M University\u2014Commerce, Commerce TX",
    "description": "A development of the \"not-so-soft\" skills through performance art and music education, as well as research training in social psychology and physics.",
    "highlights": []
  }
]
