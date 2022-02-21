import * as React from 'react';
import { List } from 'react-native-paper';

const ListLog = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="History" style={{marginBottom:180}}>
      <List.Accordion
        title="Attendance History"
        left={props => <List.Icon {...props} icon="briefcase-check" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Break"
        left={props => <List.Icon {...props} icon="clock-time-nine-outline" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
      <List.Accordion
        title="Client Visit History"
        left={props => <List.Icon {...props} icon="map-marker-check" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
};

export default ListLog;