import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { BlogPost, PostStatus } from '../src/modules/blog/entities/blog-post.entity';
import { Author } from '../src/modules/blog/entities/author.entity';
import { Tag } from '../src/modules/blog/entities/tag.entity';
import { Category } from '../src/modules/blog/entities/category.entity';
import slugify from 'slugify';

dotenv.config();

// ---------------------------------------------------------------------------
// Article content
// ---------------------------------------------------------------------------

const ARTICLE_1_TITLE = 'Why 73% of SOC2 Audits Fail on the First Attempt — And How to Prevent It';
const ARTICLE_1_CONTENT = `
SOC2 compliance has become the de facto trust currency for SaaS companies. Prospects demand it, enterprise sales cycles stall without it, and investors increasingly view it as a marker of operational maturity. Yet the industry's open secret is this: nearly three-quarters of organizations that attempt their first SOC2 Type II audit fail to achieve an unqualified opinion on the first pass.

The failure isn't a lack of effort. It's a structural problem in how most teams approach compliance — treating it as a project with a deadline rather than an engineering discipline with continuous requirements.

## The Three Failure Patterns

After working with dozens of engineering teams preparing for SOC2 audits, we've identified three recurring failure patterns that account for the vast majority of first-attempt failures.

### Pattern 1: Evidence Collection Gaps

The most common failure mode isn't a missing control — it's a missing *proof* of a control. Your team may genuinely rotate access keys every 90 days, but if you can't produce timestamped evidence that this happened consistently over the entire audit window, the auditor has no choice but to flag it.

This pattern is especially insidious because teams often discover the gap three months into a twelve-month audit window. By then, the missing evidence is unrecoverable. You cannot retroactively prove that a policy was in effect six months ago.

**The engineering fix:** Build evidence collection into your infrastructure from day one. Use infrastructure-as-code tools like Terraform to version-control access policies. Configure CloudTrail or equivalent audit logging with immutable storage. Set up automated weekly snapshots of IAM configurations, firewall rules, and encryption settings. The evidence should generate itself — if a human has to remember to screenshot something, the process is already broken.

### Pattern 2: Continuous Monitoring vs Point-in-Time

SOC2 Type II evaluates controls over a *period* — typically 6 to 12 months. This is fundamentally different from Type I, which only checks whether controls exist at a single point in time. Many teams prepare as if they're doing Type I: they set everything up perfectly the week before the auditor arrives, then discover that the auditor needs to verify consistent operation across the entire window.

The gap is most visible in areas like vulnerability scanning, access reviews, and incident response. Running a single vulnerability scan before the audit doesn't satisfy the requirement for *continuous* vulnerability management. The auditor will ask: "Show me scans from March. Show me the remediation timeline for the critical findings in April. Show me the exception process you followed in June when you couldn't patch within SLA."

**The engineering fix:** Implement continuous monitoring infrastructure that runs independently of the audit cycle. Deploy vulnerability scanners on automated schedules (weekly for infrastructure, daily for application dependencies). Configure alerting on security group changes, IAM policy modifications, and encryption configuration drift. Store all scan results with timestamps in a centralized compliance data store. When the auditor asks for evidence from any arbitrary month, you should be able to query it in under a minute.

### Pattern 3: The HR and Operations Blind Spot

Engineering teams tend to focus exclusively on technical controls because that's their domain of expertise. But SOC2 Trust Service Criteria span five categories: Security, Availability, Processing Integrity, Confidentiality, and Privacy. Many of the required controls live outside the engineering team's direct control — in HR, operations, and management processes.

Background checks for new employees, security awareness training completion records, board-level risk assessment reviews, vendor management procedures — these are all common audit requirements that get overlooked until the auditor requests them.

**The engineering fix:** While you can't automate HR processes the same way you automate infrastructure, you *can* build the tracking systems. Create a compliance requirements matrix that maps every SOC2 criterion to a specific owner, evidence source, and collection frequency. Build dashboards that show the current status of all controls — technical and non-technical. Set up automated reminders for quarterly access reviews, annual training renewals, and vendor reassessments. The goal is to make the non-technical controls as visible and trackable as the technical ones.

## The Prevention Framework

Based on these patterns, we've developed a prevention framework that our clients use to achieve first-attempt success rates above 95%.

### Start 6 Months Before the Audit Window Opens

Not 6 months before the audit — 6 months before the audit *window* opens. If your Type II audit covers January through December, your preparation should begin in July of the previous year. This gives you time to implement controls, verify they work, and build the evidence collection infrastructure before the clock starts ticking.

### Automate Evidence Collection First

Before implementing a single new security control, build the system that will collect evidence of that control's operation. This inverts the typical approach (implement control → realize evidence is needed → scramble to backfill) and ensures that every control has a corresponding evidence trail from the moment it's activated.

### Run Internal Audits Monthly

Don't wait for the external auditor to find gaps. Conduct monthly internal reviews against the full set of SOC2 criteria. Use a checklist that matches exactly what the auditor will evaluate. Assign ownership for each finding and track remediation to completion. By the time the external audit begins, you should have already found and fixed every issue the auditor might discover.

### Treat Compliance as Infrastructure

The most successful SOC2 programs we've seen treat compliance the same way they treat production infrastructure — with version control, automated testing, monitoring, and incident response. Compliance policies are stored in Git. Evidence collection runs in CI/CD pipelines. Control failures trigger alerts the same way production outages do. This isn't overkill; it's the natural evolution of compliance in engineering-driven organizations.

## Conclusion

SOC2 audit failures are preventable engineering problems, not bureaucratic inevitabilities. The organizations that succeed on their first attempt share a common trait: they approach compliance as a continuous engineering discipline rather than a point-in-time project. They build evidence collection into their infrastructure, monitor controls continuously, and treat compliance gaps with the same urgency as production incidents.

The 73% failure rate is not a reflection of the difficulty of SOC2. It's a reflection of how many organizations are still approaching it wrong.
`.trim();

const ARTICLE_2_TITLE = 'Cloud Insurance Is Not a Product — It\'s an Engineering Discipline';
const ARTICLE_2_CONTENT = `
The term "cloud insurance" gets thrown around in boardrooms as if it were something you could buy — a policy, a product, a checkbox on a procurement form. Sign here, pay the premium, and your cloud infrastructure is "insured." This framing is not just inaccurate; it's actively dangerous. It creates a false sense of security that evaporates the moment an incident actually occurs.

Real cloud insurance isn't a product. It's an engineering discipline — a set of architectural decisions, operational practices, and recovery capabilities that determine whether your organization survives a cloud failure or spirals into an extended outage with cascading business impact.

## The Insurance Illusion

Traditional insurance works because the insured party can be made financially whole after a loss. Your building burns down, and the insurance company writes a check to rebuild it. The model assumes that money can restore what was lost.

Cloud infrastructure doesn't work this way. When a critical database becomes corrupted, when a misconfigured IAM policy exposes customer data, or when a region-wide outage takes your services offline, no amount of money can instantly restore the systems. You can't write a check to un-corrupt a database. You can't purchase your way to zero-downtime during an AWS us-east-1 failure.

What you *can* do is engineer your systems in advance so that these failures have minimal impact. That's the real insurance — and it's built by engineers, not purchased from vendors.

## The Four Pillars of Cloud Risk Engineering

Effective cloud risk reduction rests on four engineering pillars, each addressing a different category of failure.

### Pillar 1: Architectural Resilience

The first line of defense is architecture that assumes failure. This isn't a new idea — it's the foundation of distributed systems engineering. But there's a gap between knowing the principle and implementing it rigorously.

Architectural resilience means multi-region deployment with automated failover. It means database replication with point-in-time recovery windows measured in seconds, not hours. It means service mesh configurations that route around unhealthy endpoints without human intervention. It means circuit breakers that prevent cascade failures from propagating across service boundaries.

The key insight is that resilience is not a feature you add after building the system. It's a constraint that shapes every architectural decision from the beginning. A system designed for single-region deployment cannot be retroactively made multi-region without significant rearchitecture. The cost of resilience increases exponentially the later it's introduced.

### Pillar 2: Disaster Recovery as Code

Traditional disaster recovery plans are documents — Word files or Confluence pages that describe what to do when something goes wrong. The problem with documents is that they're never tested rigorously, they drift out of sync with the actual infrastructure, and they rely on human operators who may be unavailable or overwhelmed during an actual disaster.

The engineering approach replaces documents with code. Recovery procedures are encoded as scripts, runbooks are executable, and the entire recovery process can be invoked with a single command. Infrastructure-as-code tools like Terraform and Pulumi allow you to reconstruct entire environments from scratch. Database backup and restoration is automated and tested weekly — not annually, not quarterly, but weekly.

The gold standard is the "gameday" exercise: a scheduled, full-scale disaster simulation where the team practices recovering from a realistic failure scenario using only their automated tooling. Organizations that run gamedays monthly discover and fix recovery gaps continuously. Organizations that skip gamedays discover them during real incidents.

### Pillar 3: Incident Readiness Engineering

Incident readiness is the practice of preparing your team and tooling for the inevitable moment when something goes wrong. It encompasses monitoring, alerting, runbooks, communication templates, and escalation procedures.

The engineering challenge is signal-to-noise ratio. Most organizations have monitoring — they have dashboards, they have alerts, they have logs. What they lack is *actionable* monitoring that tells an on-call engineer exactly what's wrong and what to do about it. An alert that says "CPU usage is high on server X" is barely better than no alert at all. An alert that says "API latency P99 exceeded 2s on the payment service, likely caused by database connection pool exhaustion, see runbook RB-042 for remediation steps" is incident readiness engineering.

Building this level of monitoring requires treating observability as a first-class engineering concern. Each service should define its Service Level Objectives (SLOs) with corresponding Service Level Indicators (SLIs). Alerts should fire on SLO violations, not raw metric thresholds. Runbooks should be linked directly from alerts and updated every time they're used.

### Pillar 4: Blast Radius Containment

The final pillar addresses the question: when a failure occurs, how much of the system is affected? The engineering goal is to minimize the blast radius of any single failure.

Blast radius containment is achieved through isolation boundaries. Separate AWS accounts for production, staging, and development. Network segmentation that prevents a compromised service from reaching databases it doesn't need. IAM policies that follow the principle of least privilege with surgical precision — not broad role assumptions that grant access to entire resource categories.

The most sophisticated implementations use cell-based architecture, where the system is divided into independent cells that each serve a subset of customers. A failure in one cell affects only the customers assigned to that cell, not the entire user base. This pattern is used by AWS itself for many of its services and is increasingly adopted by organizations that cannot tolerate blast radii affecting more than a small percentage of their users.

## The Cost Equation

The objection, invariably, is cost. Multi-region deployments are more expensive. Weekly disaster recovery testing requires engineering time. Sophisticated monitoring infrastructure has operational overhead.

This is true. But the cost equation must be evaluated against the alternative: the cost of an extended outage. For most SaaS companies, a multi-day outage means lost revenue, customer churn, contractual SLA penalties, potential regulatory action, and reputational damage that persists long after the systems are restored. For companies handling sensitive data, a breach can be existential.

Cloud insurance isn't free. But neither is the alternative.

## Conclusion

The next time someone asks about your cloud insurance strategy, the answer shouldn't be a vendor name or a policy number. It should be a description of your architecture's resilience properties, your disaster recovery automation, your incident readiness engineering, and your blast radius containment mechanisms.

That's what real cloud insurance looks like. It's not a product you buy. It's a discipline you practice — every day, in every architectural decision, in every deployment, in every incident response. And it's built by engineers, not purchased from underwriters.
`.trim();

const ARTICLE_3_TITLE = 'The AI-Augmented SOC Analyst: Moving Beyond Alert Fatigue';
const ARTICLE_3_CONTENT = `
Security Operations Centers face an arithmetic problem that no amount of hiring can solve. The volume of security alerts generated by modern infrastructure — endpoint detection, network monitoring, cloud audit logs, application security tools — grows faster than the number of analysts available to investigate them. The result is alert fatigue: a condition where analysts become desensitized to alerts because the overwhelming majority are false positives, duplicates, or low-severity events that don't warrant investigation.

Industry data tells a stark story. The average SOC receives over 10,000 alerts per day, yet most teams can meaningfully investigate fewer than 50. The remaining alerts are either auto-closed, ignored, or superficially triaged — a process that virtually guarantees that real threats will be missed among the noise.

The solution isn't more analysts. It's a fundamental rearchitecture of how alerts are processed, correlated, and prioritized — and artificial intelligence is the engineering tool that makes this rearchitecture possible.

## The Current SOC Model Is Broken

The traditional SOC model follows a tiered structure: Tier 1 analysts perform initial triage, escalating to Tier 2 for deeper investigation, and to Tier 3 for incident response and forensics. This model was designed for a world where alert volumes were manageable and each alert could receive meaningful human attention.

That world no longer exists. In a modern cloud-native environment, a single misconfigured security group can generate hundreds of alerts. A routine deployment can trigger dozens of change detection events. A legitimate penetration test can flood the SOC with thousands of alerts that look identical to real attacks.

The Tier 1 analyst in this environment spends their entire shift doing one thing: closing alerts. Not investigating them — closing them. The cognitive load of evaluating 200+ alerts per shift, most of which are noise, makes it functionally impossible to maintain the level of attention required to catch the one alert that represents a genuine threat.

This isn't a training problem or a motivation problem. It's an engineering problem — and it requires an engineering solution.

## AI as an Engineering Layer, Not a Replacement

The most productive framing for AI in security operations is as an engineering layer that sits between raw alert sources and human analysts. The AI layer performs three functions that humans do poorly at scale: correlation, enrichment, and prioritization.

### Correlation: Connecting the Dots

Individual security alerts are rarely meaningful in isolation. A failed SSH login is noise. A hundred failed SSH logins from the same IP address in five minutes is a brute force attempt. A hundred failed SSH logins followed by a successful login followed by a new cron job installation is a compromise.

AI correlation engines analyze alerts across time, source, and context to identify patterns that represent genuine attack chains. They maintain a running model of normal behavior for each entity in the environment — users, hosts, services — and flag deviations that correlate with known attack patterns.

The engineering challenge is building correlation rules that are specific enough to reduce false positives while remaining general enough to catch novel attack variations. Traditional SIEM correlation rules are brittle — they match exact patterns and miss slight variations. Machine learning models, particularly those trained on the organization's own historical data, can generalize across variations while maintaining high precision.

### Enrichment: Adding Context Automatically

When a human analyst investigates an alert, the first 15 minutes are typically spent gathering context. Who owns this resource? Is this IP address known to be malicious? Has this user exhibited this behavior before? Is this system in a maintenance window? What's the business criticality of the affected application?

AI enrichment automates this context gathering. When an alert is generated, the enrichment layer automatically queries threat intelligence feeds, asset management databases, user activity histories, and change management systems to build a complete context package. By the time a human analyst sees the alert, it arrives with all the information needed to make an immediate decision.

The impact on investigation time is dramatic. Organizations that implement automated enrichment typically see mean investigation time drop from 25-30 minutes per alert to under 5 minutes. This isn't because the investigation is less thorough — it's because the analyst isn't spending time on information retrieval tasks that a machine can perform in milliseconds.

### Prioritization: Risk-Based Alert Scoring

Not all alerts are equal, but traditional SOC tools treat them as if they are. A critical severity alert on a development server that's scheduled for decommission next week deserves less attention than a medium severity alert on a production database containing customer financial data.

AI prioritization assigns risk scores to alerts based on multiple factors: the severity of the vulnerability, the business criticality of the affected asset, the current threat landscape, the organization's specific risk profile, and the confidence level of the detection. This risk score determines the order in which alerts are presented to human analysts, ensuring that the highest-impact potential threats are investigated first.

The mathematics of this approach are compelling. If your team can investigate 50 alerts per day and the AI properly ranks the 10 genuinely important alerts in the top 50, your true positive investigation rate approaches 100%. Without AI prioritization, those 10 important alerts are scattered randomly among 10,000 — and the probability of investigating all of them is effectively zero.

## Implementation Architecture

A production AI-augmented SOC typically follows a layered architecture:

**Layer 1 — Collection and Normalization:** All security data sources feed into a centralized data lake. Events are normalized to a common schema (typically something based on OCSF or ECS) to enable cross-source correlation.

**Layer 2 — AI Processing Pipeline:** Normalized events pass through the AI pipeline: correlation engine (identifying multi-event patterns), enrichment service (adding context from external sources), and scoring model (assigning risk-based priority).

**Layer 3 — Automated Response:** Low-risk, high-confidence events are handled automatically. Known false positive patterns are suppressed. Routine remediation actions (blocking a known malicious IP, disabling a compromised service account) are executed without human intervention, with full audit logging.

**Layer 4 — Human Investigation:** High-priority, complex events are presented to human analysts with full context, correlation chains, and recommended investigation steps. The analyst makes the final decision on response actions.

This architecture doesn't replace human analysts — it amplifies them. The human role shifts from data processing (which machines do better) to judgment, decision-making, and strategic response (which humans do better). A SOC team of five analysts working with AI augmentation can effectively cover a threat surface that would previously require a team of twenty.

## The Organizational Shift

Implementing AI-augmented security operations isn't purely a technology project. It requires an organizational shift in how security teams define their role.

Traditional SOC metrics — alerts processed per shift, mean time to acknowledge, percentage of alerts reviewed — incentivize throughput over outcomes. These metrics must be replaced with outcome-oriented measures: mean time to detect genuine threats, false negative rate, blast radius of incidents that are detected, and time from detection to containment.

This shift is uncomfortable because outcome metrics expose the actual security posture of the organization, whereas throughput metrics can look healthy even when the security posture is poor. But outcome metrics are the only ones that matter — and AI augmentation makes them achievable for the first time.

## Conclusion

Alert fatigue is not a human problem — it's an engineering problem that has been incorrectly attributed to human limitations. Analysts aren't failing because they're not good enough. They're failing because the system asks them to perform a task that is mathematically impossible: meaningfully process 10,000 alerts per day with a team of five people.

AI augmentation resolves this impossibility by restructuring the work. Machines handle correlation, enrichment, and prioritization — tasks that require processing power, not judgment. Humans handle investigation, decision-making, and response — tasks that require judgment, not processing power.

The result is a SOC that actually works: one where real threats are detected and responded to promptly, false positives are suppressed intelligently, and human analysts spend their time on work that requires human intelligence.

The future of security operations isn't choosing between humans and machines. It's engineering the right interface between them.
`.trim();

// ---------------------------------------------------------------------------
// Seed logic
// ---------------------------------------------------------------------------

async function seed(): Promise<void> {
    const ds = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5433', 10),
        username: process.env.DB_USER || 'defnix',
        password: process.env.DB_PASSWORD || 'defnix_dev',
        database: process.env.DB_NAME || 'defnix',
        entities: [BlogPost, Author, Tag, Category],
        synchronize: false,
    });

    await ds.initialize();
    console.log('✅ Connected to database');

    // --- Author ---
    let author = await ds.getRepository(Author).findOne({ where: { name: 'Defnix Engineering' } });
    if (!author) {
        author = ds.getRepository(Author).create({
            name: 'Defnix Engineering',
            bio: 'The Defnix engineering team specializes in SOC2 compliance, cloud security architecture, and AI-driven security automation for modern startups and enterprises.',
        });
        author = await ds.getRepository(Author).save(author);
        console.log('   Created author: Defnix Engineering');
    } else {
        console.log('   Author already exists: Defnix Engineering');
    }

    // --- Tags ---
    const tagNames = ['soc2', 'cloud-security', 'ai-security', 'compliance'];
    const tags: Tag[] = [];
    for (const name of tagNames) {
        let tag = await ds.getRepository(Tag).findOne({ where: { slug: name } });
        if (!tag) {
            tag = ds.getRepository(Tag).create({ name, slug: name });
            tag = await ds.getRepository(Tag).save(tag);
            console.log(`   Created tag: ${name}`);
        }
        tags.push(tag);
    }

    // --- Categories ---
    const categoryDefs = [
        { name: 'Engineering', slug: 'engineering' },
        { name: 'Security', slug: 'security' },
        { name: 'AI & Automation', slug: 'ai-automation' },
    ];
    const categories: Category[] = [];
    for (const def of categoryDefs) {
        let cat = await ds.getRepository(Category).findOne({ where: { slug: def.slug } });
        if (!cat) {
            cat = ds.getRepository(Category).create(def);
            cat = await ds.getRepository(Category).save(cat);
            console.log(`   Created category: ${def.name}`);
        }
        categories.push(cat);
    }

    // --- Helper to calculate reading time ---
    function readingTime(content: string): number {
        return Math.ceil(content.split(/\s+/).length / 200);
    }

    // --- Articles ---
    const articles = [
        {
            title: ARTICLE_1_TITLE,
            content: ARTICLE_1_CONTENT,
            excerpt: 'Nearly three-quarters of organizations fail their first SOC2 Type II audit. We break down the three failure patterns and the engineering framework that prevents them.',
            seoTitle: 'Why 73% of SOC2 Audits Fail — Prevention Guide | Defnix',
            seoDescription: 'Learn the three most common SOC2 Type II audit failure patterns and the engineering framework to achieve first-attempt compliance success.',
            tags: [tags[0], tags[3]],         // soc2, compliance
            categories: [categories[1]],       // Security
        },
        {
            title: ARTICLE_2_TITLE,
            content: ARTICLE_2_CONTENT,
            excerpt: 'Cloud insurance isn\'t something you buy — it\'s something you build. We explore the four engineering pillars of cloud risk reduction and incident readiness.',
            seoTitle: 'Cloud Insurance as Engineering Discipline | Defnix',
            seoDescription: 'Discover the four pillars of cloud risk engineering: architectural resilience, disaster recovery as code, incident readiness, and blast radius containment.',
            tags: [tags[1]],                   // cloud-security
            categories: [categories[0]],       // Engineering
        },
        {
            title: ARTICLE_3_TITLE,
            content: ARTICLE_3_CONTENT,
            excerpt: 'Alert fatigue is an engineering problem, not a human one. Learn how AI augmentation restructures SOC workflows to actually catch real threats.',
            seoTitle: 'AI-Augmented SOC Analyst: Beyond Alert Fatigue | Defnix',
            seoDescription: 'How AI correlation, enrichment, and risk-based prioritization transform SOC operations from alert-processing factories into effective threat detection systems.',
            tags: [tags[2], tags[1]],           // ai-security, cloud-security
            categories: [categories[2]],        // AI & Automation
        },
    ];

    for (const article of articles) {
        const slug = slugify(article.title, { lower: true, strict: true });
        const existing = await ds.getRepository(BlogPost).findOne({ where: { slug } });

        if (existing) {
            console.log(`   Post already exists: "${article.title}"`);
            continue;
        }

        const post = ds.getRepository(BlogPost).create({
            title: article.title,
            slug,
            content: article.content,
            excerpt: article.excerpt,
            seoTitle: article.seoTitle,
            seoDescription: article.seoDescription,
            author,
            authorId: author.id,
            status: PostStatus.PUBLISHED,
            readingTime: readingTime(article.content),
            publishedAt: new Date(),
            tags: article.tags,
            categories: article.categories,
        });

        await ds.getRepository(BlogPost).save(post);
        console.log(`   ✅ Created post: "${article.title}" (${readingTime(article.content)} min read)`);
    }

    console.log('\n🎉 Blog seed complete!');
    await ds.destroy();
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
});
