import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts with additional weights for better typography
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf', fontStyle: 'italic' },
  ],
});

// Register monospace font for diagram
Font.register({
  family: 'Courier',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Courier/courier-webfont.ttf', fontWeight: 400 },
  ],
});

// Register fallback fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Helvetica/helvetica-webfont.ttf', fontWeight: 400 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 48,
    paddingBottom: 72,
    backgroundColor: '#ffffff',
    fontFamily: 'Roboto',
  },
  header: {
    marginBottom: 36,
    borderBottomWidth: 3,
    borderBottomColor: '#2563EB',
    paddingBottom: 20,
    position: 'relative',
  },
  headerAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 8,
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },
  headerContent: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 10,
    color: '#1E3A8A',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 300,
    color: '#4B5563',
    letterSpacing: 0.7,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#1E3A8A',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 6,
  },
  sectionTitleText: {
    flex: 1,
  },
  sectionTitleLine: {
    width: 40,
    height: 3,
    backgroundColor: '#2563EB',
    marginTop: 8,
  },
  card: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    position: 'relative',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    backgroundColor: '#2563EB',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#F8FAFC',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: '#1E3A8A',
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: 400,
    color: '#64748B',
    marginTop: 4,
    fontStyle: 'italic',
  },
  cardContent: {
    padding: 16,
    fontSize: 13,
    color: '#334155',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -6,
  },
  gridItem: {
    width: '50%',
    padding: 6,
  },
  list: {
    marginLeft: 6,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 6,
    paddingRight: 6,
  },
  bullet: {
    width: 12,
    fontSize: 13,
    color: '#2563EB',
  },
  listItemText: {
    flex: 1,
    fontSize: 13,
    color: '#334155',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 36,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: '#CBD5E1',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    fontWeight: 400,
    color: '#64748B',
    fontStyle: 'italic',
  },
  pageNumber: {
    fontSize: 10,
    fontWeight: 500,
    color: '#475569',
  },
  diagramContainer: {
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  diagramText: {
    fontSize: 10,
    color: '#334155',
    fontFamily: 'Courier',
    lineHeight: 1.4,
  },
});

interface ProjectReportPDFProps {
  projectData: any;
}

export function ProjectReportPDF({ projectData }: ProjectReportPDFProps) {
  if (!projectData || !projectData.insights) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No project data available</Text>
        </Page>
      </Document>
    );
  }

  const { insights } = projectData;

  const renderList = (items: any[], key: string) => {
    if (!Array.isArray(items)) return null;
    return items.map((item, index) => (
      <View key={`${key}-${index}`} style={styles.listItem}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.listItemText}>{item}</Text>
      </View>
    ));
  };

  const renderArchitectureDiagram = () => {
    const diagram = insights.architecture?.diagram || insights.architecture?.mermaid;
    if (!diagram) return null;

    // Split the diagram into lines for better formatting
    const lines = diagram.split('\n').map((line: string, index: number) => (
      <Text key={index} style={styles.diagramText}>{line}</Text>
    ));

    return (
      <View style={styles.diagramContainer}>
        <Text style={styles.cardTitle}>Architecture Diagram</Text>
        <View style={{ marginTop: 8 }}>
          {lines}
        </View>
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerAccent} />
          <View style={styles.headerContent}>
            <Text style={styles.title}>{projectData.name || 'Untitled Project'}</Text>
            <Text style={styles.subtitle}>Project Report</Text>
          </View>
        </View>

        {/* System Architecture Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>System Architecture</Text>
            <View style={styles.sectionTitleLine} />
          </View>
          
          {/* Architecture Diagram */}
          {renderArchitectureDiagram()}

          <View style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Architecture Overview</Text>
            </View>
            <View style={styles.cardContent}>
              {renderList(insights.architecture?.components || [], 'component')}
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Component Relationships</Text>
            </View>
            <View style={styles.cardContent}>
              {renderList(insights.architecture?.relationships || [], 'relationship')}
            </View>
          </View>
        </View>

        {/* Roadmap Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Project Roadmap</Text>
            <View style={styles.sectionTitleLine} />
          </View>
          {(insights.roadmap?.phases || []).map((phase: any, index: number) => (
            <View key={`phase-${index}`} style={styles.card}>
              <View style={styles.cardAccent} />
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Phase {index + 1}: {phase.phase}</Text>
                <Text style={styles.cardSubtitle}>Duration: {phase.duration}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text>{phase.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Timeline Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Project Timeline</Text>
            <View style={styles.sectionTitleLine} />
          </View>
          {(insights.timeline?.milestones || []).map((milestone: any, index: number) => (
            <View key={`milestone-${index}`} style={styles.card}>
              <View style={styles.cardAccent} />
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{milestone.milestone}</Text>
                <Text style={styles.cardSubtitle}>Date: {milestone.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tech Stack Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Technology Stack</Text>
            <View style={styles.sectionTitleLine} />
          </View>
          <View style={styles.grid}>
            {['frontend', 'backend', 'database', 'devops'].map((category) => (
              <View key={category} style={styles.gridItem}>
                <View style={styles.card}>
                  <View style={styles.cardAccent} />
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    {renderList(insights.techStack?.[category] || [], `tech-${category}`)}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Team Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Team Structure</Text>
            <View style={styles.sectionTitleLine} />
          </View>
          <View style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Required Roles</Text>
            </View>
            <View style={styles.cardContent}>
              {renderList(insights.team?.roles || [], 'role')}
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardAccent} />
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Team Structure</Text>
            </View>
            <View style={styles.cardContent}>
              {renderList(insights.team?.structure?.teams || [], 'team')}
            </View>
          </View>
        </View>

        {/* Risks Section */}
        <View style={styles.section}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Risk Assessment</Text>
            <View style={styles.sectionTitleLine} />
          </View>
          <View style={styles.grid}>
            {['technical', 'business', 'operational', 'mitigation'].map((category) => (
              <View key={category} style={styles.gridItem}>
                <View style={styles.card}>
                  <View style={styles.cardAccent} />
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>
                      {category.charAt(0).toUpperCase() + category.slice(1)} {category === 'mitigation' ? 'Strategies' : 'Risks'}
                    </Text>
                  </View>
                  <View style={styles.cardContent}>
                    {renderList(insights.risks?.[category] || [], `risk-${category}`)}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>{projectData.name || 'Untitled Project'} - Confidential</Text>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )} />
        </View>
      </Page>
    </Document>
  );
}