const ContaBancaria = require("../src/contaBancaria");

let conta;
let contaBancaria;

beforeEach(() => {
  conta = {
    id: "001",
    titular: "Ugioni",
    saldo: 1000,
    status: "ativa",
    limite: 500,
    criadaEm: new Date(),
    atualizadaEm: new Date(),
  };
  contaBancaria = new ContaBancaria(conta);
});

// obterSaldo
test("obterSaldo retorna o saldo atual da conta", () => {
  expect(contaBancaria.obterSaldo()).toBe(1000);
});

// obterTitular
test("obterTitular retorna o titular da conta", () => {
  expect(contaBancaria.obterTitular()).toBe("Ugioni");
});

// obterStatus
test("obterStatus retorna o status da conta", () => {
  expect(contaBancaria.obterStatus()).toBe("ativa");
});

// obterLimite
test("obterLimite retorna o limite da conta", () => {
  expect(contaBancaria.obterLimite()).toBe(500);
});

// estaAtiva
test("estaAtiva retorna true quando status é ativa", () => {
  expect(contaBancaria.estaAtiva()).toBe(true);
});

test("estaAtiva retorna false quando status não é ativa", () => {
  conta.status = "bloqueada";
  expect(contaBancaria.estaAtiva()).toBe(false);
});

// depositar
test("depositar com valor positivo aumenta o saldo e retorna true", () => {
  expect(contaBancaria.depositar(200)).toBe(true);
  expect(contaBancaria.obterSaldo()).toBe(1200);
});

test("depositar com valor zero retorna false e não altera saldo", () => {
  expect(contaBancaria.depositar(0)).toBe(false);
  expect(contaBancaria.obterSaldo()).toBe(1000);
});

test("depositar com valor negativo retorna false e não altera saldo", () => {
  expect(contaBancaria.depositar(-50)).toBe(false);
  expect(contaBancaria.obterSaldo()).toBe(1000);
});

// sacar
test("sacar com valor válido diminui o saldo e retorna true", () => {
  expect(contaBancaria.sacar(300)).toBe(true);
  expect(contaBancaria.obterSaldo()).toBe(700);
});

test("sacar usando o limite disponível retorna true", () => {
  expect(contaBancaria.sacar(1400)).toBe(true);
  expect(contaBancaria.obterSaldo()).toBe(-400);
});

test("sacar com valor zero retorna false", () => {
  expect(contaBancaria.sacar(0)).toBe(false);
});

test("sacar com valor negativo retorna false", () => {
  expect(contaBancaria.sacar(-100)).toBe(false);
});

test("sacar com valor acima do saldo disponível retorna false", () => {
  expect(contaBancaria.sacar(1600)).toBe(false);
  expect(contaBancaria.obterSaldo()).toBe(1000);
});

// alterarTitular
test("alterarTitular com nome válido atualiza o titular e retorna true", () => {
  expect(contaBancaria.alterarTitular("Novo Titular")).toBe(true);
  expect(contaBancaria.obterTitular()).toBe("Novo Titular");
});

test("alterarTitular com string vazia retorna false", () => {
  expect(contaBancaria.alterarTitular("")).toBe(false);
  expect(contaBancaria.obterTitular()).toBe("Ugioni");
});

test("alterarTitular com null retorna false", () => {
  expect(contaBancaria.alterarTitular(null)).toBe(false);
});

// bloquearConta
test("bloquearConta muda status para bloqueada e retorna true", () => {
  expect(contaBancaria.bloquearConta()).toBe(true);
  expect(contaBancaria.obterStatus()).toBe("bloqueada");
});

test("bloquearConta em conta já bloqueada retorna false", () => {
  conta.status = "bloqueada";
  expect(contaBancaria.bloquearConta()).toBe(false);
});

// ativarConta
test("ativarConta em conta bloqueada muda status para ativa e retorna true", () => {
  conta.status = "bloqueada";
  expect(contaBancaria.ativarConta()).toBe(true);
  expect(contaBancaria.obterStatus()).toBe("ativa");
});

test("ativarConta em conta já ativa retorna false", () => {
  expect(contaBancaria.ativarConta()).toBe(false);
});

// encerrarConta
test("encerrarConta com saldo zero muda status para encerrada e retorna true", () => {
  conta.saldo = 0;
  expect(contaBancaria.encerrarConta()).toBe(true);
  expect(contaBancaria.obterStatus()).toBe("encerrada");
});

test("encerrarConta com saldo diferente de zero retorna false", () => {
  expect(contaBancaria.encerrarConta()).toBe(false);
  expect(contaBancaria.obterStatus()).toBe("ativa");
});

// podeSacar
test("podeSacar retorna true para valor dentro do saldo disponível", () => {
  expect(contaBancaria.podeSacar(500)).toBe(true);
});

test("podeSacar retorna true usando o limite", () => {
  expect(contaBancaria.podeSacar(1500)).toBe(true);
});

test("podeSacar retorna false para valor zero", () => {
  expect(contaBancaria.podeSacar(0)).toBe(false);
});

test("podeSacar retorna false para valor negativo", () => {
  expect(contaBancaria.podeSacar(-1)).toBe(false);
});

test("podeSacar retorna false para valor acima do saldo disponível", () => {
  expect(contaBancaria.podeSacar(1501)).toBe(false);
});

// aplicarTarifa
test("aplicarTarifa com valor positivo diminui o saldo e retorna true", () => {
  expect(contaBancaria.aplicarTarifa(50)).toBe(true);
  expect(contaBancaria.obterSaldo()).toBe(950);
});

test("aplicarTarifa com valor zero retorna false", () => {
  expect(contaBancaria.aplicarTarifa(0)).toBe(false);
});

test("aplicarTarifa com valor negativo retorna false", () => {
  expect(contaBancaria.aplicarTarifa(-10)).toBe(false);
});

// ajustarLimite
test("ajustarLimite com valor positivo atualiza o limite e retorna true", () => {
  expect(contaBancaria.ajustarLimite(1000)).toBe(true);
  expect(contaBancaria.obterLimite()).toBe(1000);
});

test("ajustarLimite com zero atualiza o limite para zero e retorna true", () => {
  expect(contaBancaria.ajustarLimite(0)).toBe(true);
  expect(contaBancaria.obterLimite()).toBe(0);
});

test("ajustarLimite com valor negativo retorna false", () => {
  expect(contaBancaria.ajustarLimite(-100)).toBe(false);
  expect(contaBancaria.obterLimite()).toBe(500);
});

// saldoNegativo
test("saldoNegativo retorna false quando saldo é positivo", () => {
  expect(contaBancaria.saldoNegativo()).toBe(false);
});

test("saldoNegativo retorna false quando saldo é zero", () => {
  conta.saldo = 0;
  expect(contaBancaria.saldoNegativo()).toBe(false);
});

test("saldoNegativo retorna true quando saldo é negativo", () => {
  conta.saldo = -100;
  expect(contaBancaria.saldoNegativo()).toBe(true);
});

// transferir
test("transferir valor válido debita da origem e credita no destino", () => {
  const contaDestino = new ContaBancaria({
    id: "002",
    titular: "Destino",
    saldo: 0,
    status: "ativa",
    limite: 0,
    criadaEm: new Date(),
    atualizadaEm: new Date(),
  });
  expect(contaBancaria.transferir(200, contaDestino)).toBe(true);
  expect(contaBancaria.obterSaldo()).toBe(800);
  expect(contaDestino.obterSaldo()).toBe(200);
});

test("transferir com valor acima do disponível retorna false", () => {
  const contaDestino = new ContaBancaria({
    id: "002",
    titular: "Destino",
    saldo: 0,
    status: "ativa",
    limite: 0,
    criadaEm: new Date(),
    atualizadaEm: new Date(),
  });
  expect(contaBancaria.transferir(9999, contaDestino)).toBe(false);
  expect(contaBancaria.obterSaldo()).toBe(1000);
});

// calcularSaldoDisponivel
test("calcularSaldoDisponivel retorna saldo mais limite", () => {
  expect(contaBancaria.calcularSaldoDisponivel()).toBe(1500);
});

// gerarResumo
test("gerarResumo retorna objeto com todos os campos corretos", () => {
  const resumo = contaBancaria.gerarResumo();
  expect(resumo).toEqual({
    titular: "Ugioni",
    saldo: 1000,
    limite: 500,
    disponivel: 1500,
    status: "ativa",
  });
});

// validarConta
test("validarConta retorna true para conta válida", () => {
  expect(contaBancaria.validarConta()).toBe(true);
});

test("validarConta retorna false quando id está ausente", () => {
  conta.id = null;
  expect(contaBancaria.validarConta()).toBe(false);
});

test("validarConta retorna false quando titular está ausente", () => {
  conta.titular = "";
  expect(contaBancaria.validarConta()).toBe(false);
});

test("validarConta retorna false quando saldo não é número", () => {
  conta.saldo = "mil";
  expect(contaBancaria.validarConta()).toBe(false);
});

test("validarConta retorna false quando limite é negativo", () => {
  conta.limite = -1;
  expect(contaBancaria.validarConta()).toBe(false);
});

test("validarConta retorna false quando status é inválido", () => {
  conta.status = "suspensa";
  expect(contaBancaria.validarConta()).toBe(false);
});

// validarConta — status válidos extras
test("validarConta retorna true para conta com status bloqueada", () => {
  conta.status = "bloqueada";
  expect(contaBancaria.validarConta()).toBe(true);
});

test("validarConta retorna true para conta com status encerrada", () => {
  conta.status = "encerrada";
  expect(contaBancaria.validarConta()).toBe(true);
});

test("validarConta retorna true quando limite é zero", () => {
  conta.limite = 0;
  expect(contaBancaria.validarConta()).toBe(true);
});

// sacar exatamente no limite do saldo disponível
test("sacar exatamente o saldo disponível retorna true", () => {
  expect(contaBancaria.sacar(1500)).toBe(true);
  expect(contaBancaria.obterSaldo()).toBe(-500);
});

// resetarConta
test("resetarConta define saldo=0, limite=0 e status=ativa", () => {
  conta.saldo = 500;
  conta.limite = 200;
  conta.status = "bloqueada";
  contaBancaria.resetarConta();
  expect(contaBancaria.obterSaldo()).toBe(0);
  expect(contaBancaria.obterLimite()).toBe(0);
  expect(contaBancaria.obterStatus()).toBe("ativa");
});
