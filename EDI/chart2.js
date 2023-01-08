fetch("data.json")
  .then(response => response.json())
  .then(data => {

    const ageGroups = {};
    data.forEach(record => {
      if (!ageGroups[record.age]) {
        ageGroups[record.age] = {
          age: record.age,
          goals: 0,
          assists: 0,
          count: 0,
        };
      }
      ageGroups[record.age].goals += record.goals;
      ageGroups[record.age].assists += record.assists;
      ageGroups[record.age].count++;
    });
    const avgAgeGroups = Object.values(ageGroups).map(group => {
      return {
        age: group.age,
        goals: Math.round(group.goals / group.count * 100) / 100,
        assists: Math.round(group.assists / group.count * 100) / 100,
      };
    });

    var chart = bb.generate({
      bindto: "#chart2",
      data: {
        x: "age",
        columns: [
          ["age", ...avgAgeGroups.map(record => record.age)],
          ["goals", ...avgAgeGroups.map(record => record.goals)],
          ["assists", ...avgAgeGroups.map(record => record.assists)],
        ],
        type: "bar",
        names: {
          age: "Wiek (lata)",
          goals: "Gole",
          assists: "Asysty",
        },
      },
      axis: {
        x: {
          label: "Wiek (lata)",
        },
        y: {
          label: "Ilosc goli/asyst",
        },
      },
    });
  })
  .catch(error => {
    console.error("Błąd podczas pobierania danych:", error);
  });