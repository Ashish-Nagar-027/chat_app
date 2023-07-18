const newRomBtn = document.getElementById('create-room-btn')
const joinRoomBtn = document.getElementById('join-room-btn')
var socket = io()

newRomBtn.addEventListener('click', async () => {
    const uniqeId = new Date().valueOf();
   const newRoomRequest = await fetch("/",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({roomId: uniqeId})
    })

    const data = await newRoomRequest.json();
    console.log(data)
    console.log(`/chat/${data.roomid}`)
     
    if(data.msg === 'room joined'){
         window.location.href = `/chat/${data.roomid}`
    }
})

joinRoomBtn.addEventListener('click', async () => {
    console.log('join room btn')
})




