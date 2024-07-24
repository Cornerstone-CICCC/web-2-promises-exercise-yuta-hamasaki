const fs = require("fs").promises;

let fName, lName, age, hobbyOne, hobbyTwo;
// THEN-CATCH SOLUTION BELOW THIS LINE
fs.readFile("./firstname.txt", "utf8")
.then((data1)=>{
  fName = data1
  return fs.readFile("./lastname.txt", "utf8")
})
.then((data2)=>{
  lName = data2
  return fs.readFile("./age.txt", "utf8") 
})
.then((data3)=>{
  age = data3
  return fs.readFile("./hobbies.txt", "utf8")
})
.then((data4)=>{
  let hobbiesData = data4.replace(/^\[|\]$/g, '').replace(/"/g, '');
  const hobbiesArr = hobbiesData.split(',').map(hobby => hobby.trim());
  hobbyOne = hobbiesArr[0]
  hobbyTwo = hobbiesArr[1]
  console.log(`${fName} ${lName} is ${age} years old and his hobbies are ${hobbyOne} and ${hobbyTwo}`)
})


// ASYNC/AWAIT SOLUTION BELOW THIS LINE
async function hobbyConverter() {
  try {
    const hobbyData = await fs.readFile("./hobbies.txt", "utf8");
    let convertedHobby = hobbyData.replace(/^\[|\]$/g, '').replace(/"/g, '');
    const hobbiesArr = convertedHobby.split(',').map(hobby => hobby.trim());
    return hobbiesArr;
  } catch (err) {
    console.error("Error in hobbyConverter", err);
  }
}

async function asyncAwaitReader() {
  try {
    const firstName = await fs.readFile("./firstname.txt", "utf8");
    const lastName = await fs.readFile("./lastname.txt", "utf8");
    const age = await fs.readFile("./age.txt", "utf8");
    const hobbyArr = await hobbyConverter();
    
    return { firstName, lastName, age, hobbyArr };
  } catch (err) {
    console.error("Something went wrong with asyncAwaitReader", err);
  }
}

asyncAwaitReader().then(data => {
  if (data) {
    console.log(`${data.firstName} ${data.lastName} is ${data.age} years old and his hobbies are ${data.hobbyArr[0]} and ${data.hobbyArr[1]}`);
  } else {
    console.error("no data");
  }
});