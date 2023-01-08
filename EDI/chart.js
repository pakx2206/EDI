// Pobierz dane z pliku data.json
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    // Uśrednij liczbę kartek w zależności od wieku
    const ageGroups = {};
    data.forEach(record => {
      if (!ageGroups[record.age]) {
        ageGroups[record.age] = {
          age: record.age,
          yellowCards: 0,
          redCards: 0,
          count: 0,
        };
      }
      ageGroups[record.age].yellowCards += record.yellow_cards;
      ageGroups[record.age].redCards += record.red_cards;
      ageGroups[record.age].count++;
    });
    const avgAgeGroups = Object.values(ageGroups).map(group => {
      return {
        age: group.age,
        yellowCards: Math.round(group.yellowCards / group.count * 100) / 100,
        redCards: Math.round(group.redCards / group.count * 100) / 100,
      };
    });

    // Stwórz wykres liniowy ilości kartek w zależności od wieku
    var chart = bb.generate({
      bindto: "#chart1",
      data: {
        x: "age",
        columns: [
          ["age", ...avgAgeGroups.map(record => record.age)],
          ["yellowCards", ...avgAgeGroups.map(record => record.yellowCards)],
          ["redCards", ...avgAgeGroups.map(record => record.redCards)],
        ],
        type: "line",
        names: {
          age: "Wiek (lata)",
          yellowCards: "Żółte kartki",
          redCards: "Czerwone kartki",
        },
      },
      axis: {
        x: {
          label: "Wiek (lata)",
        },
        y: {
          label: "Liczba kartek",
        },
      },
    });
  })
  .catch(error => {
    console.error("Błąd podczas pobierania danych:", error);
  });
