// console.log('Client-side code running');

// const button = document.getElementById('myButton');
// button.onclick = function(e) { 
//   console.log('button was clicked');
//   alert('Button Clicked')
// };



const entry = {

}
const catCount = {}
function clickBtn(spanID, category) {
    
    if(entry[spanID]){
        entry[spanID].count++
   }else{
    entry[spanID] = {
        count: 1,
        category
    }
   }

   const spanIDEl = document.getElementById(spanID)
   spanIDEl.innerText = entry[spanID].count

   const entryEl = document.getElementById('entry')
   entryEl.value = JSON.stringify(entry)


   if(catCount[category]){
    catCount[category]++
   }else{
    catCount[category] = 1
   }

   const catEl = document.getElementById(category)
   catEl.innerText = catCount[category]
}