const { PUBSUB_URL } = process.env

const SendMessage = async (msg: any) => {
  console.log(`Sent message: ${JSON.stringify(msg)}`)
}

export default SendMessage
