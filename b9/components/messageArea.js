import { MessageItem } from'./messageitem.js'
class MessageArea {
 $container ; 
 $messageList ; 

 $composer ;
 $input ; 
 $btnSend ; 

 activeConversation
 messageSubcribe;

 constructor () {
     this.$container = document.createElement('div') 
     this.$container.classList.add('flex','flex-col','flex-1')

     this.$messageList = document.createElement('div')
     this.$messageList.classList.add('flex-1')

     this.$composer = document.createElement('form')
     this.$composer.classList.add('flex')
     this.$composer.addEventListener('submit',this.handleSendMessage)

     this.$input = document.createElement('input')
     this.$input.type = 'text'
     this.$input.placeholder = 'please be nice in chat room'
     this.$input.classList.add('flex-1')

     this.$btnSend = document.createElement('button')
     this.$btnSend.type = 'submit'
     this.$btnSend.innerHTML= 'send'

    
 }

 messageListener = (snapshot)=>{
     snapshot.docChanges().forEach(change=>{
         const data = change.doc.data()
         const $messageItem = new MessageItem(data.sender ,data.content)
            this.$messageList.appendChild($messageItem.render())
       
     })
 }

 handleSendMessage = (event)=>{
   event.preventDefault()
   //sender = authenticated user
   // content = value of this.$input.value
   // conversation ID  = active conversation ID 
   console.log(this.activeConversation)
   if(this.activeConversation){
    db.collection('message').add({
        sender : firebase.auth().currentUser.email,
        content : this.$input.value,
        conversationId : this.activeConversation.id, 
    })
   }else{
       alert('Pls select conversation')
   }
   
 }
 setConversation=(conversation)=>{
  this.activeConversation = conversation;
  this.$messageList.innerHTML=""
  if(this.messageSubcribe){
    this.messageSubcribe()
  }
  this.messageSubcribe=db.collection('message').where('conversationId','==',this.activeConversation.id).onSnapshot(this.messageListener)
 }
 render(){
            this.$composer.appendChild(this.$input)
            this.$composer.appendChild(this.$btnSend)

            this.$container.appendChild(this.$messageList)
            this.$container.appendChild(this.$composer)
     
            return this.$container
 }

}

export {MessageArea}