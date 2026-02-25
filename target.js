let user = {
    firstname: "Aurélien",
    lastname: "Vaast",
    email: "avaast@myges.fr"
}

for(let [key,value] of Object.entries(user)){
    console.log(key + ":" + value);
}