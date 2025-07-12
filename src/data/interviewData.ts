import { InterviewRole, InterviewQuestion } from '@/types/interview';

export const interviewRoles: InterviewRole[] = [
  {
    id: 'software-developer',
    title: 'Software Developer',
    description: 'Frontend, Backend, and Full-Stack Development',
    icon: '💻'
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Data Analysis, SQL, and Business Intelligence',
    icon: '📊'
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Product Strategy, Roadmapping, and User Experience',
    icon: '🎯'
  },
  {
    id: 'marketing-specialist',
    title: 'Marketing Specialist',
    description: 'Digital Marketing, Content, and Brand Strategy',
    icon: '📢'
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'User Experience, Design Systems, and Prototyping',
    icon: '🎨'
  },
  {
    id: 'sales-representative',
    title: 'Sales Representative',
    description: 'B2B Sales, Client Relations, and Revenue Growth',
    icon: '🤝'
  }
];

export const questionsByRole: Record<string, InterviewQuestion[]> = {
  'software-developer': [
    {
      id: 'sd-1',
      question: 'Explain the difference between REST and GraphQL APIs.',
      sampleAnswer: 'REST is an architectural style that uses standard HTTP methods and endpoints for different resources, while GraphQL is a query language that allows clients to request exactly the data they need through a single endpoint. REST typically involves multiple round trips for related data, whereas GraphQL can fetch all required data in one request, reducing over-fetching and under-fetching issues.',
      category: 'Technical Knowledge',
      difficulty: 'Medium'
    },
    {
      id: 'sd-2',
      question: 'How do you handle version control in a team environment?',
      sampleAnswer: 'I follow Git best practices including creating feature branches for new work, writing descriptive commit messages, and using pull requests for code review. I ensure regular communication with team members about merge conflicts and maintain a clean commit history through rebasing when appropriate. I also follow the team\'s branching strategy, whether it\'s Git Flow or GitHub Flow.',
      category: 'Process & Collaboration',
      difficulty: 'Easy'
    },
    {
      id: 'sd-3',
      question: 'Describe how you would optimize a slow-performing web application.',
      sampleAnswer: 'I would start by profiling the application to identify bottlenecks using browser dev tools and performance monitoring. Common optimizations include: minimizing bundle sizes through code splitting, implementing lazy loading, optimizing images and assets, reducing API calls through caching strategies, using CDNs, and optimizing database queries. I\'d also consider implementing service workers for offline functionality and better caching.',
      category: 'Problem Solving',
      difficulty: 'Hard'
    },
    {
      id: 'sd-4',
      question: 'What is your approach to testing in software development?',
      sampleAnswer: 'I follow the testing pyramid: unit tests for individual functions and components, integration tests for component interactions, and end-to-end tests for critical user flows. I practice test-driven development when appropriate, maintain good test coverage, and use mocking for external dependencies. I also believe in continuous testing through CI/CD pipelines.',
      category: 'Best Practices',
      difficulty: 'Medium'
    },
    {
      id: 'sd-5',
      question: 'Tell me about a challenging bug you solved recently.',
      sampleAnswer: 'I recently debugged a memory leak in a React application. Users reported the app becoming slow after extended use. I used Chrome DevTools to profile memory usage and discovered that event listeners weren\'t being cleaned up properly in useEffect hooks. I implemented proper cleanup functions and added React.memo optimization for frequently re-rendering components, which resolved the issue.',
      category: 'Problem Solving',
      difficulty: 'Hard'
    }
  ],
  'data-analyst': [
    {
      id: 'da-1',
      question: 'How would you handle missing data in a dataset?',
      sampleAnswer: 'I\'d first analyze the pattern of missing data to understand if it\'s missing completely at random (MCAR), missing at random (MAR), or missing not at random (MNAR). Depending on the situation, I might use listwise deletion for small amounts of random missing data, mean/median imputation for numerical data, mode imputation for categorical data, or more sophisticated methods like multiple imputation or machine learning-based imputation for complex patterns.',
      category: 'Data Processing',
      difficulty: 'Medium'
    },
    {
      id: 'da-2',
      question: 'Explain the difference between correlation and causation.',
      sampleAnswer: 'Correlation measures the statistical relationship between two variables - how they tend to change together. Causation means one variable directly influences another. The key distinction is that correlation doesn\'t imply causation. For example, ice cream sales and drowning incidents are correlated (both increase in summer), but ice cream doesn\'t cause drowning. To establish causation, we need controlled experiments, temporal precedence, and elimination of confounding variables.',
      category: 'Statistical Concepts',
      difficulty: 'Easy'
    },
    {
      id: 'da-3',
      question: 'How do you ensure data quality in your analysis?',
      sampleAnswer: 'I implement a comprehensive data quality framework including: data profiling to understand structure and content, validation rules to check for accuracy and completeness, consistency checks across different data sources, outlier detection and handling, data lineage documentation, and regular audits. I also establish data quality metrics and monitoring to catch issues early in the pipeline.',
      category: 'Data Quality',
      difficulty: 'Medium'
    },
    {
      id: 'da-4',
      question: 'Describe a time when you had to present complex data insights to non-technical stakeholders.',
      sampleAnswer: 'I once analyzed customer churn data for executives who needed actionable insights. Instead of showing complex statistical models, I created a simple dashboard with three key metrics: churn rate trends, top risk factors, and potential revenue impact. I used storytelling techniques, starting with the business problem, showing clear before/after scenarios, and ending with specific recommendations. I avoided jargon and used analogies they could relate to.',
      category: 'Communication',
      difficulty: 'Medium'
    },
    {
      id: 'da-5',
      question: 'What tools and technologies do you use for data analysis?',
      sampleAnswer: 'My primary tools include SQL for data extraction and manipulation, Python with pandas, numpy, and scikit-learn for analysis and modeling, and Tableau or Power BI for visualization. I also use Jupyter notebooks for exploratory analysis, Git for version control, and cloud platforms like AWS or Google Cloud for large-scale data processing. The choice depends on the project requirements and team preferences.',
      category: 'Technical Skills',
      difficulty: 'Easy'
    }
  ],
  'product-manager': [
    {
      id: 'pm-1',
      question: 'How do you prioritize features in a product roadmap?',
      sampleAnswer: 'I use a framework combining business value, user impact, and technical feasibility. I typically employ methods like RICE scoring (Reach, Impact, Confidence, Effort) or value vs. effort matrices. I gather input from stakeholders, analyze user feedback and data, consider strategic objectives, and assess resource constraints. Regular roadmap reviews ensure we stay aligned with changing market conditions and business priorities.',
      category: 'Product Strategy',
      difficulty: 'Medium'
    },
    {
      id: 'pm-2',
      question: 'Describe how you would launch a new feature.',
      sampleAnswer: 'I\'d start with defining success metrics and target audience, then coordinate with engineering for technical readiness and QA for testing. I\'d work with marketing on positioning and messaging, create user documentation and training materials, plan a phased rollout starting with internal testing, then beta users, followed by gradual public release. Post-launch, I\'d monitor metrics closely, gather user feedback, and iterate based on learnings.',
      category: 'Product Launch',
      difficulty: 'Medium'
    },
    {
      id: 'pm-3',
      question: 'How do you handle conflicting requirements from different stakeholders?',
      sampleAnswer: 'I first ensure I understand each stakeholder\'s underlying needs and business objectives. I facilitate discussions to find common ground and trade-offs that align with overall product strategy. When necessary, I use data and user research to support decisions. I communicate transparently about constraints and help stakeholders understand the impact of their requests on other priorities. Sometimes escalation to leadership is needed for final decisions.',
      category: 'Stakeholder Management',
      difficulty: 'Hard'
    },
    {
      id: 'pm-4',
      question: 'What metrics do you use to measure product success?',
      sampleAnswer: 'I focus on metrics that align with business goals and user value. These typically include user engagement metrics (DAU/MAU, retention rates), business metrics (revenue, conversion rates, customer acquisition cost), product-specific metrics (feature adoption, user satisfaction scores), and leading indicators that predict long-term success. I avoid vanity metrics and ensure we\'re measuring outcomes, not just outputs.',
      category: 'Analytics & Metrics',
      difficulty: 'Medium'
    },
    {
      id: 'pm-5',
      question: 'Tell me about a time when a product feature failed. How did you handle it?',
      sampleAnswer: 'We launched a new onboarding flow that actually decreased conversion rates by 15%. I immediately gathered data to understand why - user session recordings showed confusion at a specific step. I quickly assembled a cross-functional team to identify the issue: unclear copy and too many required fields. We implemented a quick fix within 48 hours and A/B tested improvements. The experience taught me the importance of more thorough user testing and having rollback plans ready.',
      category: 'Problem Solving',
      difficulty: 'Hard'
    }
  ],
  'marketing-specialist': [
    {
      id: 'ms-1',
      question: 'How do you measure the success of a marketing campaign?',
      sampleAnswer: 'I establish clear KPIs before launch based on campaign objectives - whether it\'s brand awareness (reach, impressions, brand lift), lead generation (cost per lead, conversion rates), or sales (ROI, customer acquisition cost). I track both leading indicators during the campaign and lagging indicators post-campaign. I also measure qualitative metrics like sentiment analysis and brand perception surveys to get a complete picture.',
      category: 'Campaign Analytics',
      difficulty: 'Medium'
    },
    {
      id: 'ms-2',
      question: 'Describe your approach to creating buyer personas.',
      sampleAnswer: 'I start with quantitative data from analytics, surveys, and sales data to identify patterns in demographics, behavior, and preferences. I supplement this with qualitative research through customer interviews and focus groups. I create detailed personas including demographics, pain points, goals, preferred communication channels, and buying behavior. I regularly update personas based on new data and ensure they\'re actionable for the entire team.',
      category: 'Customer Research',
      difficulty: 'Medium'
    },
    {
      id: 'ms-3',
      question: 'How do you stay current with digital marketing trends?',
      sampleAnswer: 'I follow industry publications like Marketing Land and Search Engine Journal, attend webinars and conferences, participate in marketing communities and forums, and maintain certifications from Google, Facebook, and HubSpot. I also test new features and platforms early, analyze competitor strategies, and network with other marketers. Most importantly, I focus on understanding the underlying principles rather than just following trends.',
      category: 'Professional Development',
      difficulty: 'Easy'
    },
    {
      id: 'ms-4',
      question: 'Explain how you would develop a content marketing strategy.',
      sampleAnswer: 'I\'d start by defining content goals aligned with business objectives, understanding our target audience and their content preferences, and auditing existing content performance. I\'d develop content pillars based on audience interests and business expertise, create a content calendar with diverse formats, establish distribution channels, and implement measurement frameworks. The strategy would include SEO optimization, repurposing content across channels, and regular performance analysis.',
      category: 'Content Strategy',
      difficulty: 'Hard'
    },
    {
      id: 'ms-5',
      question: 'How do you handle budget allocation across different marketing channels?',
      sampleAnswer: 'I analyze historical performance data for each channel, considering metrics like CAC, LTV, and ROAS. I allocate budget based on the customer journey stage each channel serves best - awareness, consideration, or conversion. I maintain a mix of proven performers and experimental channels, typically following the 70-20-10 rule: 70% on proven channels, 20% on emerging opportunities, and 10% on experimental tactics. Regular monitoring allows for reallocation based on performance.',
      category: 'Budget Management',
      difficulty: 'Hard'
    }
  ],
  'ux-designer': [
    {
      id: 'ux-1',
      question: 'Walk me through your design process.',
      sampleAnswer: 'I follow a user-centered design process: Research (user interviews, surveys, analytics), Define (personas, user journeys, problem statements), Ideate (brainstorming, sketching, workshops), Prototype (wireframes, mockups, interactive prototypes), and Test (usability testing, A/B testing, feedback collection). I iterate throughout the process and collaborate closely with stakeholders. Documentation and handoff to development are crucial final steps.',
      category: 'Design Process',
      difficulty: 'Medium'
    },
    {
      id: 'ux-2',
      question: 'How do you handle stakeholder feedback that conflicts with user research?',
      sampleAnswer: 'I present the user research data clearly, showing how it connects to business goals and user outcomes. I facilitate discussions to understand the stakeholder\'s concerns and business constraints. Sometimes I propose design solutions that address both user needs and business requirements, or suggest compromises with clear trade-offs. If needed, I recommend additional research or testing to validate different approaches. Clear communication about the risks of ignoring user data is essential.',
      category: 'Stakeholder Management',
      difficulty: 'Hard'
    },
    {
      id: 'ux-3',
      question: 'Describe a time when you had to design for accessibility.',
      sampleAnswer: 'I worked on redesigning a government website that needed to meet WCAG 2.1 AA standards. I conducted accessibility audits, implemented proper color contrast ratios, added alternative text for images, ensured keyboard navigation, and used semantic HTML. I tested with screen readers and involved users with disabilities in testing. I also created accessibility guidelines for the team and established regular accessibility reviews in our design process.',
      category: 'Accessibility',
      difficulty: 'Medium'
    },
    {
      id: 'ux-4',
      question: 'How do you conduct effective user research?',
      sampleAnswer: 'I start by defining clear research objectives and choosing appropriate methods - interviews for qualitative insights, surveys for quantitative data, usability testing for behavioral observations. I recruit representative participants, create structured but flexible discussion guides, and ensure unbiased moderation. I analyze findings systematically, look for patterns across participants, and present actionable insights with supporting evidence to stakeholders.',
      category: 'User Research',
      difficulty: 'Medium'
    },
    {
      id: 'ux-5',
      question: 'What\'s your approach to creating a design system?',
      sampleAnswer: 'I start with an audit of existing UI elements to identify inconsistencies, then establish design principles and brand guidelines. I create foundational elements like color palettes, typography scales, and spacing systems, followed by component libraries with clear usage guidelines. I ensure proper documentation, involve developers early for feasibility, and establish governance processes for updates. Testing the system across different products and gathering feedback is crucial for refinement.',
      category: 'Design Systems',
      difficulty: 'Hard'
    }
  ],
  'sales-representative': [
    {
      id: 'sr-1',
      question: 'How do you handle objections during a sales call?',
      sampleAnswer: 'I listen actively to understand the underlying concern behind the objection, acknowledge the prospect\'s viewpoint, and ask clarifying questions to fully understand their perspective. I then address the specific concern with relevant information, case studies, or social proof. I reframe objections as opportunities to provide more value and ensure the prospect feels heard throughout the process. Follow-up questions help confirm the objection has been resolved.',
      category: 'Sales Techniques',
      difficulty: 'Medium'
    },
    {
      id: 'sr-2',
      question: 'Describe your approach to qualifying leads.',
      sampleAnswer: 'I use a structured qualification framework like BANT (Budget, Authority, Need, Timeline) or MEDDIC. I ask open-ended questions to understand their current challenges, decision-making process, and timeline. I identify key stakeholders and decision criteria early. I also assess fit between their needs and our solution, ensuring we can deliver real value. Proper qualification saves time for both parties and increases close rates.',
      category: 'Lead Qualification',
      difficulty: 'Medium'
    },
    {
      id: 'sr-3',
      question: 'How do you maintain relationships with existing clients?',
      sampleAnswer: 'I schedule regular check-ins to understand their evolving needs and ensure satisfaction with our solution. I proactively share relevant industry insights, new features, and best practices that could benefit their business. I respond quickly to any issues and work collaboratively to find solutions. I also look for expansion opportunities that genuinely add value to their operations and celebrate their successes with our solution.',
      category: 'Customer Success',
      difficulty: 'Easy'
    },
    {
      id: 'sr-4',
      question: 'Tell me about a time you lost a significant deal. What did you learn?',
      sampleAnswer: 'I lost a six-figure deal because I didn\'t properly identify all decision-makers early in the process. The technical team loved our solution, but the CFO had budget concerns I wasn\'t aware of until late in the sales cycle. I learned to map out the entire decision-making unit upfront, understand each stakeholder\'s priorities, and build relationships across the organization. Now I always confirm the decision-making process and timeline early.',
      category: 'Learning from Failure',
      difficulty: 'Hard'
    },
    {
      id: 'sr-5',
      question: 'How do you stay motivated during challenging periods?',
      sampleAnswer: 'I focus on the long-term value I\'m providing to clients and maintain a positive mindset by celebrating small wins. I analyze my activities to identify areas for improvement rather than just focusing on outcomes. I stay connected with successful colleagues for motivation and best practices. Regular skill development keeps me confident, and I remember that sales is a numbers game - persistence and continuous improvement lead to success.',
      category: 'Motivation & Mindset',
      difficulty: 'Easy'
    }
  ]
};