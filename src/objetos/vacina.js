class Vacina {
  constructor(nome, dose, idade) {
    this.id = 0;
    this.nome = nome;
    this.dose = dose;
    this.idade = idade;
    this.lote = "";
    this.local = "";
    this.tecnico = "";
    this.doses = [];
  }
  adicionarDose(dose) {
    this.doses.push(dose);
  }
}
/* 
// Exemplo de uso
const vacina1 = new Vacina("BCG", "12345", "Centro de Saúde", "Dr. Silva");
console.log(vacina1.getDados()); // Exibe os dados da vacina
 */

export default Vacina;
