class Vacina {
  constructor(nome, lote, local, tecnico) {
    this.nome = nome;
    this.lote = lote;
    this.local = local;
    this.tecnico = tecnico;
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
