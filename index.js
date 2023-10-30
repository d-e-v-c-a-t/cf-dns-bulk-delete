const axios = require("axios").default;

(async () => {
try {
  const zoneId = "ZONE_ID_HERE"
  const authToken = "AUTH_TOKEN_HERE"

  //Get all records
  const resp = await axios.get(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
    headers: {
      "Authorization": `Bearer ${authToken}`
    }
  });

  if (resp?.data?.result) {
    const dnsRecords = resp.data.result
    //console.log(dnsRecords)

    for (let i = 0; i < dnsRecords.length; i++) {
      const dnsRecord = dnsRecords[i]

      console.log("Deleting: ", dnsRecord.id)

      try {
        //Delete DNS Record
        const delStatus = await axios.delete(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${dnsRecord.id}`, {
          headers: {
            "Authorization": `Bearer ${authToken}`
          }
        })
        console.log(delStatus.data)
      } catch (error) {
        console.log("Deletion failed: ", error.message)
      }
    }
  }

  console.log("Done!")
} catch (error) {
  console.log(error.message)
}
})()