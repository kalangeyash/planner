import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { projectData } from '@/types/project';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '1 solid #e0e0e0',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  card: {
    padding: 10,
    marginBottom: 10,
    border: '1 solid #e0e0e0',
    borderRadius: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 12,
    color: '#666666',
  },
  list: {
    marginLeft: 20,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  gridItem: {
    width: '50%',
    padding: 5,
  },
  architectureDiagram: {
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    border: '1 solid #e0e0e0',
    borderRadius: 4,
  },
});

interface ProjectReportPDFProps {
  projectData: any;
}

export function ProjectReportPDF({ projectData }: ProjectReportPDFProps) {
  const { insights } = projectData;

  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{projectData.name}</Text>
            <Text style={styles.subtitle}>Project Report</Text>
          </View>

          {/* System Architecture Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>System Architecture</Text>
            <View style={styles.architectureDiagram}>
              <Text style={styles.cardTitle}>Architecture Overview</Text>
              <Text style={styles.cardContent}>
                {insights.architecture.components.map((component: string, index: number) => (
                  <Text key={index} style={styles.listItem}>• {component}</Text>
                ))}
              </Text>
              <Text style={styles.cardTitle}>Component Relationships</Text>
              <Text style={styles.cardContent}>
                {insights.architecture.relationships.map((rel: string, index: number) => (
                  <Text key={index} style={styles.listItem}>• {rel}</Text>
                ))}
              </Text>
            </View>
          </View>

          {/* Roadmap Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Project Roadmap</Text>
            {insights.roadmap.phases.map((phase: any, index: number) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>Phase {index + 1}: {phase.phase}</Text>
                <Text style={styles.cardContent}>Duration: {phase.duration}</Text>
                <Text style={styles.cardContent}>{phase.description}</Text>
              </View>
            ))}
          </View>

          {/* Timeline Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Project Timeline</Text>
            {insights.timeline.milestones.map((milestone: any, index: number) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{milestone.milestone}</Text>
                <Text style={styles.cardContent}>Date: {milestone.date}</Text>
              </View>
            ))}
          </View>

          {/* Tech Stack Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technology Stack</Text>
            <View style={styles.grid}>
              <View style={styles.gridItem}>
                <Text style={styles.cardTitle}>Frontend</Text>
                <View style={styles.list}>
                  {insights.techStack.frontend.map((tech: string, index: number) => (
                    <Text key={index} style={styles.listItem}>• {tech}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.cardTitle}>Backend</Text>
                <View style={styles.list}>
                  {insights.techStack.backend.map((tech: string, index: number) => (
                    <Text key={index} style={styles.listItem}>• {tech}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.cardTitle}>Database</Text>
                <View style={styles.list}>
                  {insights.techStack.database.map((tech: string, index: number) => (
                    <Text key={index} style={styles.listItem}>• {tech}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.cardTitle}>DevOps</Text>
                <View style={styles.list}>
                  {insights.techStack.devops.map((tech: string, index: number) => (
                    <Text key={index} style={styles.listItem}>• {tech}</Text>
                  ))}
                </View>
              </View>
            </View>
          </View>

          {/* Team Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Team Structure</Text>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Required Roles</Text>
              <View style={styles.list}>
                {insights.team.roles.map((role: string, index: number) => (
                  <Text key={index} style={styles.listItem}>• {role}</Text>
                ))}
              </View>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Team Structure</Text>
              <View style={styles.list}>
                {insights.team.structure.teams.map((team: string, index: number) => (
                  <Text key={index} style={styles.listItem}>• {team}</Text>
                ))}
              </View>
            </View>
          </View>

          {/* Risks Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Risk Assessment</Text>
            <View style={styles.grid}>
              <View style={styles.gridItem}>
                <Text style={styles.cardTitle}>Technical Risks</Text>
                <View style={styles.list}>
                  {insights.risks.technical.map((risk: string, index: number) => (
                    <Text key={index} style={styles.listItem}>• {risk}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.cardTitle}>Business Risks</Text>
                <View style={styles.list}>
                  {insights.risks.business.map((risk: string, index: number) => (
                    <Text key={index} style={styles.listItem}>• {risk}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.cardTitle}>Operational Risks</Text>
                <View style={styles.list}>
                  {insights.risks.operational.map((risk: string, index: number) => (
                    <Text key={index} style={styles.listItem}>• {risk}</Text>
                  ))}
                </View>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.cardTitle}>Mitigation Strategies</Text>
                <View style={styles.list}>
                  {insights.risks.mitigation.map((strategy: string, index: number) => (
                    <Text key={index} style={styles.listItem}>• {strategy}</Text>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
} 