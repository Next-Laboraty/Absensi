import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { useSelector } from "react-redux";

export default function NotificationScreen() {
  const { notif } = useSelector(state => state.Notifikasi)
  const notX = Object.values(notif)
  console.log(notif)
  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{margin:20}}>
        {/* {notX.map((ix) => 
        <Layout level={'3'} style={{padding:10,borderRadius:10,marginVertical:5}} key={ix.trigger.remoteMessage.messageId}>
          <Text style={{fontFamily:'Medium'}}>{ix.content.title}</Text>
          <Text style={{fontFamily:'Regular'}}>{ix.content.body}</Text>
        </Layout>
        )
        } */}
        <Text style={{fontFamily:'Medium'}}>Under Maintenance</Text>
      </Layout>
    </Layout>
  )
}