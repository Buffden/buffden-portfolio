import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  company: string;
  companyUrl: string;
  position: string;
  duration: string;
  responsibilities: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  activeTabIndex = 0;

  experiences: Experience[] = [
    {
      company: 'Clarivate',
      companyUrl: 'https://clarivate.com',
      position: 'Software Engineer',
      duration: 'August 2023 - July 2024',
      responsibilities: [
        'Led development of multiple web applications using Angular, TypeScript, and RxJS, implementing complex features and optimizing performance',
        'Architected and maintained CI/CD pipelines with Jenkins and Docker, achieving 40% faster deployments and enhanced code quality',
        'Mentored junior developers through code reviews and knowledge sharing sessions, fostering team growth and code quality standards',
        'Collaborated with product teams to design and implement scalable solutions for enterprise-level applications'
      ]
    },
    {
      company: 'Clarivate',
      companyUrl: 'https://clarivate.com',
      position: 'Associate Software Engineer',
      duration: 'October 2021 - July 2023',
      responsibilities: [
        'Developed and maintained frontend features using Angular and TypeScript, focusing on responsive design and cross-browser compatibility',
        'Implemented automated testing strategies resulting in 85% test coverage and reduced bug incidents',
        'Participated in agile ceremonies and contributed to sprint planning and estimation processes',
        'Collaborated with UX team to implement pixel-perfect designs and improve user experience'
      ]
    },
    {
      company: 'Clarivate',
      companyUrl: 'https://clarivate.com',
      position: 'Software Engineer Intern',
      duration: 'August 2021 - October 2021',
      responsibilities: [
        'Assisted in developing new features for web applications using Angular and TypeScript',
        'Created unit tests and end-to-end tests using Jasmine and Protractor',
        'Participated in code reviews and implemented feedback to improve code quality',
        'Learned and applied best practices in frontend development and version control'
      ]
    }
  ];

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }
}
