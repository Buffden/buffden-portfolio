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
                { name: 'Next.js', icon: this.iconPath('Next.js.svg') },
                { name: 'TypeScript', icon: this.iconPath('TypeScript.svg') },
                { name: 'JavaScript', icon: this.iconPath('JavaScript.svg') },
                { name: 'HTML5', icon: this.iconPath('HTML5.svg') },
                { name: 'CSS3', icon: this.iconPath('CSS3.svg') },
                { name: 'Redux', icon: this.iconPath('Redux.svg') },
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
                { name: 'Postman', icon: this.iconPath('Postman.svg') },
                { name: 'Socket.io', icon: this.iconPath('Socket.io.svg') }
            ]
        },
        {
            title: 'Cloud & DevOps',
            items: [
                { name: 'AWS', icon: this.iconPath('AWS.svg') },
                { name: 'Docker', icon: this.iconPath('Docker.svg') },
                { name: 'Kubernetes', icon: this.iconPath('Kubernetes.svg') },
                { name: 'NGINX', icon: this.iconPath('NGINX.svg') },
                { name: 'Jenkins', icon: this.iconPath('Jenkins.svg') },
                { name: 'GitHub Actions', icon: this.iconPath('GitHub Actions.svg') },
                { name: 'Linux', icon: this.iconPath('Linux.svg') },
                { name: 'Ubuntu', icon: this.iconPath('Ubuntu.svg') }
            ]
        },
        {
            title: 'Data & Messaging',
            items: [
                { name: 'PostgreSQL', icon: this.iconPath('PostgreSQL.svg') },
                { name: 'MongoDB', icon: this.iconPath('MongoDB.svg') },
                { name: 'Redis', icon: this.iconPath('Redis.svg') },
                { name: 'MySQL', icon: this.iconPath('MySQL.svg') },
                { name: 'SQLite', icon: this.iconPath('SQLite.svg') },
                { name: 'Apache Kafka', icon: this.iconPath('Apache Kafka.svg') }
            ]
        },
        {
            title: 'Testing & Tools',
            items: [
                { name: 'Jasmine', icon: this.iconPath('Jasmine.svg') },
                { name: 'SonarQube', icon: this.iconPath('SonarQube.svg') },
                { name: 'JUnit', icon: this.iconPath('JUnit.svg') },
                { name: 'Apache', icon: this.iconPath('Apache.svg') },
                { name: 'Selenium', icon: this.iconPath('Selenium.svg') },
                { name: 'Git', icon: this.iconPath('Git.svg') },
                { name: 'GitHub', icon: this.iconPath('GitHub.svg') },
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
