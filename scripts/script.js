fetch("https://my.api.mockaroo.com/project.json?key=aa2213a0")

    .then((response) => response.json())
    .then((json) => {


        let li = `<tr><th>First Name</th><th>Last Name</th><th>Age</th><th>Goals</th> <th>Assists</th><th>Yellow Cards</th><th>Red Cards</th></tr>`;


        json.forEach((player) => {
            li += `<tr>
    <td>${player.first_name}</td>
    <td>${player.last_name} </td>
    <td>${player.age}</td>
    <td>${player.goals}</td>
    <td>${player.assists}</td>
    <td>${player.yellow_cards}</td>
    <td>${player.red_cards}</td>
  </tr>`;
        });


        document.getElementById("players").innerHTML = li;
    });