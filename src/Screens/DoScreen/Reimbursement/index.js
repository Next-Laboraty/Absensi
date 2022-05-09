import React from 'react-native'
import { Layout, Text, List, ListItem, Divider, Button } from '@ui-kitten/components'
import MaintenanceScreen from '../../../Molecule/MaintenanceScreen'
import { StyleSheet } from 'react-native';

export default function SalarySlipScreen(props) {
    const data = new Array(8).fill({
        title: 'Item',
        description: 'Description for Item',
    });
    const renderItem = ({ item, index }) => (
        <ListItem
            onPress={() => alert('test')}
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
        />
    );
    return (
        <>
        <Button style={styles.buttonBaru} size={'small'} appearance={'outline'} status={'primary'} onPress={()=>props.navigation.push('Rembes')}>Buat Baru Reimbursement</Button>
        <List
            data={data}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
        />
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonBaru:{
        marginHorizontal:20,marginVertical:10
    }
});