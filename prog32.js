// Consider following employee collection:
// [{_id: 1,name: "Eric",age: 30,position: "Full Stack Developer",salary: 
// 60000},
// {_id: 2,name: "Erica",age: 35,position: "Intern",salary: 8000},
// {_id: 3,name: "Erical",age: 40,position: "UX/UI Designer",salary: 56000},
// {_id: 4,name: "treric7",age: 37,position: "Team Leader",salary: 85000},
// {_id: 5,name: "Eliza",age: 25,position: "Software Developer",salary: 
// 45000},
// {_id: 6,name: "Trian",age: 29,position: "Data Scientist",salary: 75000},
// {_id: 7,name: "Elizan",age: 25,position: "Full Stack Developer",salary: 
// 42000}]
// Insert above data in mentioned collection under database named “main” 
// and write a queries to perform below tasks in node.js using Mongoose.
// (1)	Update Documnent with a field "Experience(years)" and value "17" 
// where age is 43 and position "Senior Manager". If no such document is 
// found then insert the document.
// (2)	Display the name and position of the employee with the highest salary 
// (3)	Display number of documents where name like “%ric%”.
// (4)	Increase the salary of an employee who has salary less than 45000 by 
// 10%.
// (5)	Display position where name contains only 4 or 5 letters.


const { ObjectId } = require("mongoose");
const mg = require("mongoose")
mg.connect("mongodb://127.0.0.1:27017/test")
.then(()=>{console.log("success")})
.catch((err=>{console.log(err)}))

const mySchema = new mg.Schema({
    name:String,
    age:Number,
    position:String,
    salary:Number,
});

const employee = mg.model("employee",mySchema)
const createDoc = async()=>{
    try{
        const emp1 = new employee({
            // _id: new ObjectId("1"),
            name: "Eric",
            age: 30,
            position: "Full Stack Developer",
            salary: 60000
        })
        const emp2 = new employee({
            // _id: 2,
            name: "Erica",
            age: 35,
            position: "Intern",
            salary: 8000
        })
        const emp3 = new employee({
            // _id: 3,
            name: "Erical",
            age: 40,
            position: "UX/UI Designer",
            salary: 56000
        })
        const emp4 = new employee({
            // _id: 4,
            name: "treric7",
            age: 37,
            position: "Team Leader",
            salary: 85000
        })
        const emp5 = new employee({
            // _id: 5,
            name: "Eliza",
            age: 25,
            position: "Software Developer",
            salary: 45000
        })
        const emp6 = new employee({
            // _id: 6,
            name: "Trian",
            age: 29,
            position: "Data Scientist",
            salary: 75000
        })
        const emp7 = new employee({
            // _id: 7,
            name: "Elizan",
            age: 25,
            position: "Full Stack Developer",
            salary: 42000
        })
    const result = await employee.insertMany([emp1,emp2,emp3,emp4,emp5,emp6,emp7])
    console.log(result)

    const result1 = await employee.updateOne({age:43, position:"Senior Manager"},{$set:{ experience:17 }},{ upsert:true })
    console.log(result1)

    const result2 = await employee.findOne().sort({salary:-1}).limit(1)
    console.log(result2)

    const result3 = await employee.find({name:/ric/})
    console.log(result3)

    const result4 = await employee.updateMany({salary:{$lt:45000}},{$mul:{salary:1.1}})
    console.log(result4)

    const result5 = await employee.find({name:/^[a-zA-Z]{4,5}/},{position:1})
    console.log(result5)
    }
    catch(err){
        console.log(err)
    }
}

createDoc()