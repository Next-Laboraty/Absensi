import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { useSelector } from "react-redux";
import MaintenanceScreen from '../../Molecule/MaintenanceScreen'

export default function NotificationScreen() {
  const { notif } = useSelector(state => state.Notifikasi)
  const notX = Object.values(notif)
  console.log(notif)
  return (
    <Layout style={{ flex: 1 }}>
      <MaintenanceScreen />
    </Layout>
  )
}