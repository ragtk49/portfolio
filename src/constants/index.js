import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    java,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    web55,
    crd,
    carrent,
    ims,
    jobit,
    tripguide,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Java Developer",
      icon: web,
    },
    {
      title: "React Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Content Creator",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "Java",
      icon: java,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "Software Engineer Intern",
      company_name: "55 Web Elements",
      icon: web55,
      iconBg: "#383E56",
      date: "August 2015 - August 2016",
      points: [
        "Developing and maintaining web applications using React.js and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
      ],
    },
    {
      title: "Software Engineer",
      company_name: "55 Web Elements",
      icon: web55,
      iconBg: "#E6DEDD",
      date: "September 2016 - November 2019",
      points: [
        "Developed and maintained single page web application using ReactJS, JavaScript for the front-end and NodeJS for the back-end ensuring high-quality performance and functionalities",
        "Implemented robust and efficient microservices using frameworks and tools such as Spring Boot, used ELK stack to monitor and analyze performance and behavior of microservices",
        "Created Java-based webservices that acted as a middle layer for an e-commerce website, providing additional layer of validations and security",
        "Enhanced the e-commerce website’s speed and usability by implementing lazy loading and minimizing the JavaScript and CSS files, resulting in a ~50% improvement in load time and increased customer satisfaction",
        "Optimized DOM manipulation code to enhance performance of MERN app by 27%, minimize reflows and repaints, and ensure smooth rendering of web pages",
        "Reduced manual testing efforts by 34% by implementing Selenium-based automated testing solutions ",
      ],
    },
    {
      title: "Software Engineer Co-op",
      company_name: "Charles River Development",
      icon: crd,
      iconBg: "#383E56",
      date: "July 2022 - Dec 2022",
      points: [
        "Worked on the foundational work and executed the next generation CI/CD process for NuGet package consumption, resulting in removal of binaries from VCS, enhanced performance of the CRD resource build by reducing resource consumption",
        "Automated CRIMS tool metric capture to perform regression tests using Silk4NET which improved metric analysis for different order sizes that helped the developers to fine tune the memory access for the product",
        "Developed a C# utility tool using SOLID design that identified conflicts in DLL packages within a project, effectively eliminating the need for manual work and resulting in a reduction of overall manual effort by ~60%",
        "Created a Java utility to execute complex SQL queries using JDBC to generate and export reporting data, delivering insightful Kibana dashboard reports for enhanced visualization and analysis",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Inventory Management System",
      description:
        "Spring Boot based microservices application that enables users to manage inventory, track orders, and generate reports.",
      tags: [
        {
          name: "spring-boot",
          color: "blue-text-gradient",
        },
        {
          name: "mysql",
          color: "green-text-gradient",
        },
        {
          name: "java",
          color: "pink-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "docker",
          color: "pink-text-gradient",
        },
        {
          name: "RestAPI",
          color: "blue-text-gradient",
        },
      ],
      image: ims,
      source_code_link: "https://github.com/ragtk49/springboot-microservices",
    },
    {
      name: "Learning Management System",
      description:
        "Web application that enables users to search for courses, view catalogues, register for the courses and manage the accounts of educators and students.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/ragtk49/LearningManangementSystem",
    },
    {
      name: "Stock Management System",
      description:
        "A trading platform that enables users to buy and sell stocks, view their portfolio, and generate reports.",
      tags: [
        {
          name: "oracle",
          color: "blue-text-gradient",
        },
        {
          name: "SQL",
          color: "green-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/ragtk49/Stock_Management_System",
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };