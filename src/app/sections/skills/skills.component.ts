import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealService } from '../../shared/scroll-reveal.service';
import { srConfig } from '../../shared/scroll-reveal.config';

interface SkillItem {
    name: string;
    icon: string;
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
    @ViewChild('skillsSection', { static: true }) skillsSection!: ElementRef;

    private iconPath(fileName: string): string {
        return `assets/images/icons/${encodeURIComponent(fileName)}`;
    }

    highlightIcons: SkillItem[] = [
        { name: 'AWS', icon: this.iconPath('AWS.svg') },
        { name: 'Docker', icon: this.iconPath('Docker.svg') },
        { name: 'Kubernetes', icon: this.iconPath('Kubernetes.svg') },
        { name: 'Angular', icon: this.iconPath('Angular.svg') },
        { name: 'Spring', icon: this.iconPath('Spring.svg') },
        { name: 'Node.js', icon: this.iconPath('Node.js.svg') },
        { name: 'TypeScript', icon: this.iconPath('TypeScript.svg') },
        { name: 'PostgreSQL', icon: this.iconPath('PostgresSQL.svg') },
        { name: 'NGINX', icon: this.iconPath('NGINX.svg') },
        { name: 'GitHub Actions', icon: this.iconPath('GitHub Actions.svg') },
        { name: 'Jenkins', icon: this.iconPath('Jenkins.svg') },
        { name: 'MongoDB', icon: this.iconPath('MongoDB.svg') },
        { name: 'Redis', icon: this.iconPath('Redis.svg') },
        { name: 'D3.js', icon: this.iconPath('D3.js.svg') }
    ];

    categories: SkillCategory[] = [
        {
            title: 'Frontend & UI',
            items: [
                { name: 'Angular', icon: this.iconPath('Angular.svg') },
                { name: 'React', icon: this.iconPath('React.svg') },
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
                { name: 'FastAPI', icon: this.iconPath('FastAPI.svg') },
                { name: 'GraphQL', icon: this.iconPath('GraphQL.svg') },
                { name: 'Postman', icon: this.iconPath('Postman.svg') },
                { name: 'Swagger', icon: this.iconPath('Swagger.svg') },
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
                { name: 'Ubuntu', icon: this.iconPath('Ubuntu.svg') },
                { name: 'Cloudflare', icon: this.iconPath('Cloudflare.svg') }
            ]
        },
        {
            title: 'Data & Messaging',
            items: [
                { name: 'PostgreSQL', icon: this.iconPath('PostgresSQL.svg') },
                { name: 'MongoDB', icon: this.iconPath('MongoDB.svg') },
                { name: 'Redis', icon: this.iconPath('Redis.svg') },
                { name: 'MySQL', icon: this.iconPath('MySQL.svg') },
                { name: 'SQLite', icon: this.iconPath('SQLite.svg') },
                { name: 'Apache Kafka', icon: this.iconPath('Apache Kafka.svg') },
                { name: 'Apache Hadoop', icon: this.iconPath('Apache Hadoop.svg') },
                { name: 'Apache Airflow', icon: this.iconPath('Apache Airflow.svg') }
            ]
        },
        {
            title: 'Testing & Tools',
            items: [
                { name: 'Git', icon: this.iconPath('Git.svg') },
                { name: 'GitHub', icon: this.iconPath('GitHub.svg') },
                { name: 'Gradle', icon: this.iconPath('Gradle.svg') },
                { name: 'NPM', icon: this.iconPath('NPM.svg') },
                { name: 'Yarn', icon: this.iconPath('Yarn.svg') },
                { name: 'YAML', icon: this.iconPath('YAML.svg') },
                { name: 'Rust', icon: this.iconPath('Rust.svg') },
                { name: 'C', icon: this.iconPath('C.svg') },
                { name: 'C++', icon: this.iconPath('C++ (CPlusPlus).svg') },
                { name: 'Apache', icon: this.iconPath('Apache.svg') },
                { name: 'Apache Tomcat', icon: this.iconPath('Apache Tomcat.svg') },
                { name: 'TortoiseGit', icon: this.iconPath('TortoiseGit.svg') },
                { name: 'Powershell', icon: this.iconPath('Powershell.svg') },
                { name: 'PuTTY', icon: this.iconPath('PuTTY.svg') },
                { name: 'Jasmine', icon: this.iconPath('Jasmine.svg') },
                { name: 'Selenium', icon: this.iconPath('Selenium.svg') },
                { name: 'Grafana', icon: this.iconPath('Grafana.svg') },
                { name: 'SonarQube', icon: this.iconPath('SonarQube.svg') },
                { name: 'Android Studio', icon: this.iconPath('Android Studio.svg') }
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
