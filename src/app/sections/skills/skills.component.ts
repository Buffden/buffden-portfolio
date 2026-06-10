import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealService } from '../../shared/scroll-reveal.service';
import { srConfig } from '../../shared/scroll-reveal.config';

interface SkillItem {
    name: string;
    icon: string;
    tooltip?: string;
}

interface SkillCategory {
    title: string;
    items: SkillItem[];
    compact?: boolean;
}

@Component({
    selector: 'app-skills',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skills.component.html',
    styleUrl: './skills.component.scss'
})
export class SkillsComponent implements AfterViewInit {
    @ViewChild('skillsSection') skillsSection!: ElementRef<HTMLElement>;

    private iconPath(fileName: string): string {
        return `assets/images/icons/${encodeURIComponent(fileName)}`;
    }

    highlightIcons: SkillItem[] = [
        { name: 'AWS', icon: this.iconPath('AWS.svg'), tooltip: 'Amazon Web Services' },
        { name: 'Docker', icon: this.iconPath('Docker.svg'), tooltip: 'Docker Containers' },
        { name: 'Kubernetes', icon: this.iconPath('Kubernetes.svg'), tooltip: 'Kubernetes Orchestration' },
        { name: 'Angular', icon: this.iconPath('Angular.svg'), tooltip: 'Angular Framework' },
        { name: 'Spring', icon: this.iconPath('Spring.svg'), tooltip: 'Spring Framework' },
        { name: 'Node.js', icon: this.iconPath('Node.js.svg'), tooltip: 'Node.js Runtime' },
        { name: 'TypeScript', icon: this.iconPath('TypeScript.svg'), tooltip: 'TypeScript Language' },
        { name: 'PostgreSQL', icon: this.iconPath('PostgreSQL.svg'), tooltip: 'PostgreSQL Database' },
        { name: 'NGINX', icon: this.iconPath('NGINX.svg'), tooltip: 'NGINX Web Server' },
        { name: 'GitHub Actions', icon: this.iconPath('GitHub Actions.svg'), tooltip: 'GitHub Actions CI/CD' },
        { name: 'Jenkins', icon: this.iconPath('Jenkins.svg'), tooltip: 'Jenkins Automation Server' },
        { name: 'MongoDB', icon: this.iconPath('MongoDB.svg'), tooltip: 'MongoDB Database' },
        { name: 'Redis', icon: this.iconPath('Redis.svg'), tooltip: 'Redis In-Memory Data Store' },
        { name: 'D3.js', icon: this.iconPath('D3.js.svg') }
    ];

    categories: SkillCategory[] = [
        {
            title: 'Frontend & UI',
            items: [
                { name: 'Angular', icon: this.iconPath('Angular.svg') },
                { name: 'TypeScript', icon: this.iconPath('TypeScript.svg') },
                { name: 'JavaScript', icon: this.iconPath('JavaScript.svg') },
                { name: 'HTML5', icon: this.iconPath('HTML5.svg') },
                { name: 'CSS3', icon: this.iconPath('CSS3.svg') },
                { name: 'D3.js', icon: this.iconPath('D3.js.svg') }
            ]
        },
        {
            title: 'Backend & APIs',
            items: [
                { name: 'Spring', icon: this.iconPath('Spring.svg') },
                { name: 'Java', icon: this.iconPath('Java.svg') },
                { name: 'Node.js', icon: this.iconPath('Node.js.svg') },
                { name: 'GraphQL', icon: this.iconPath('GraphQL.svg') },
                { name: 'FastAPI', icon: this.iconPath('FastAPI.svg') },
                { name: 'Python', icon: this.iconPath('Python.svg') },
            ]
        },
        {
            title: 'Cloud & DevOps',
            items: [
                { name: 'Cloudflare', icon: this.iconPath('Cloudflare.svg') },
                { name: 'Docker', icon: this.iconPath('Docker.svg') },
                { name: 'Kubernetes', icon: this.iconPath('Kubernetes.svg') },
                { name: 'NGINX', icon: this.iconPath('NGINX.svg') },
                { name: 'Jenkins', icon: this.iconPath('Jenkins.svg') },
                { name: 'GitHub Actions', icon: this.iconPath('GitHub Actions.svg') },
                { name: 'Linux', icon: this.iconPath('Linux.svg') },
                { name: 'YAML', icon: this.iconPath('YAML.svg') },
            ]
        },
        {
            title: 'Data & Messaging',
            items: [
                { name: 'PostgreSQL', icon: this.iconPath('PostgreSQL.svg') },
                { name: 'MySQL', icon: this.iconPath('MySQL.svg') },
                { name: 'Redis', icon: this.iconPath('Redis.svg') },
                { name: 'Neo4j', icon: this.iconPath('Neo4j.svg') },
                { name: 'Elasticsearch', icon: this.iconPath('Elasticsearch.svg') },
                { name: 'Apache Kafka', icon: this.iconPath('Apache Kafka.svg') }
            ]
        },
        {
            title: 'AWS Services',
            compact: true,
            items: [
                { name: 'Amazon EC2', icon: this.iconPath('Amazon EC2.svg'), tooltip: 'Elastic Compute Cloud' },
                { name: 'Amazon VPC', icon: this.iconPath('Amazon VPC.svg'), tooltip: 'Virtual Private Cloud' },
                { name: 'AWS IAM', icon: this.iconPath('AWS IAM.svg'), tooltip: 'Identity & Access Management' },
                { name: 'Amazon RDS', icon: this.iconPath('Amazon RDS.svg'), tooltip: 'Relational Database Service' },
                { name: 'AWS Lambda', icon: this.iconPath('AWS Lambda.svg'), tooltip: 'Serverless Functions' },
                { name: 'Amazon EventBridge', icon: this.iconPath('Amazon EventBridge.svg'), tooltip: 'Serverless Event Bus' },
                { name: 'Amazon ECS', icon: this.iconPath('Amazon ECS.svg'), tooltip: 'Elastic Container Service' },
                { name: 'Amazon SNS', icon: this.iconPath('Amazon SNS.svg'), tooltip: 'Simple Notification Service' },
                { name: 'Amazon SQS', icon: this.iconPath('Amazon SQS.svg'), tooltip: 'Simple Queue Service' },
                { name: 'AWS Secrets Manager', icon: this.iconPath('AWS Secrets Manager.svg'), tooltip: 'Secrets Manager' },
                { name: 'Amazon S3', icon: this.iconPath('Amazon S3.svg'), tooltip: 'Simple Storage Service' },
                { name: 'Amazon CloudFront', icon: this.iconPath('aws-cloudfront.svg'), tooltip: 'CloudFront CDN' },
                { name: 'AWS ALB', icon: this.iconPath('Elastic Load Balancing.svg'), tooltip: 'Application Load Balancer' },
            ]
        },
        {
            title: 'AI & ML',
            items: [
                { name: 'OpenAI', icon: this.iconPath('OpenAI.svg') },
                { name: 'Spring AI', icon: this.iconPath('SpringAI.svg') },
                { name: 'LLM', icon: this.iconPath('LLM.svg'), tooltip: 'Large Language Models' },
            ]
        },
        {
            title: 'Testing',
            items: [
                { name: 'JUnit', icon: this.iconPath('JUnit.svg') },
                { name: 'Mockito', icon: this.iconPath('Mockito.svg') },
                { name: 'Vitest', icon: this.iconPath('Vitest.svg') },
                { name: 'Jasmine', icon: this.iconPath('Jasmine.svg') },
                { name: 'Selenium', icon: this.iconPath('Selenium.svg') },
                { name: 'Postman', icon: this.iconPath('Postman.svg') },
            ]
        },
        {
            title: 'Dev Tools',
            items: [
                { name: 'Git', icon: this.iconPath('Git.svg') },
                { name: 'GitHub', icon: this.iconPath('GitHub.svg') },
                { name: 'Maven', icon: this.iconPath('Maven.svg') },
                { name: 'NPM', icon: this.iconPath('NPM.svg') },
                { name: 'ESLint', icon: this.iconPath('ESLint.svg') },
                { name: 'SonarQube', icon: this.iconPath('SonarQube.svg') },
            ]
        }
    ];

    constructor(private scrollReveal: ScrollRevealService) { }

    ngAfterViewInit() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            this.scrollReveal.reveal(this.skillsSection.nativeElement, srConfig());
        }
    }
}
