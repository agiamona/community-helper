const usersData = [
    {
        username: "jdoe",
        password: "pass1",
        name: "Jane",
        enrollments: [
            {id: "c0", dropped: false},
            {id: "c2", dropped: true}
        ],
        inhouseRequests: [
            {id: "i0", date:"4/15/2019", status:"Accepted!"},
            {id: "i2", date:"4/15/2019", quantity: 25, status:"Pending!"},
            {id: "i3", date:"5/25/2019", quantity: 1, status:"Cancelled!"}
        ],
        externalRequests: [
            {
                id: "e0", 
                status: "Pending!",
                details: "My elderly aunt now needs assistance with housekeeping and companionship. "
                    + "I'm looking for someone to go to her house 2 or 3 times a week. What would this cost?"
            }
        ]
    },
    {
        username: "jSmith",
        password: "pass2",
        name: "John",  
        enrollments: [ ],
        inhouseRequests: [ ],
        externalRequests: [ ]
    }
]


export default usersData;