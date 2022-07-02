const Client = require("../lib");
const c = new Client();

c.login({
    url: 'https://api.mycad.com',
    token: 'adhbutfv7cse8ygifbweyv8t7f8gW9H08N',
    version: 1,
});

// c.customRoute("", "GET").then((res: any) => {
//   console.log(res);
// });

c.GetCitizens({}).then((res) => {
    console.log(res);
});
