class Vacina {
  constructor(nome, dose, idade, id, data, local, lote, tecnico) {
    if (id) {
      // Se o ID for fornecido, ele é usado (para vacinas padrão)
      this.id = id;
    } else if (dose) {
      // Vacinas padrão terão ID no formato `${nome}_${dose}`
      this.id = `${nome}_${dose}`;
    } else if (data) {
      // Vacinas adicionadas manualmente terão ID no formato `${nome}_${data}`
      this.id = `${nome}_${data}`;
    }
    this.nome = nome;
    this.dose = dose || "UmaDose";
    this.idade = idade || null;
    this.data = data || "";
    this.local = local || "";
    this.lote = lote || "";
    this.tecnico = tecnico || "";
  }
}

/* 
// Exemplo de uso
const vacina1 = new Vacina("BCG", "12345", "Centro de Saúde", "Dr. Silva");
console.log(vacina1.getDados()); // Exibe os dados da vacina
 */

export default Vacina;
