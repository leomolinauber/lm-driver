
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LMDriverCalculator() {
  const [valorCorrida, setValorCorrida] = useState(0);
  const [kmPercorrer, setKmPercorrer] = useState(0);
  const [kmPorLitro, setKmPorLitro] = useState(10);
  const [precoCombustivel, setPrecoCombustivel] = useState(6);
  const [quantidadeMaximaCorridas, setQuantidadeMaximaCorridas] = useState(10);
  const [metaDiariaLiquida, setMetaDiariaLiquida] = useState(150);
  const [resultado, setResultado] = useState(null);

  const calcularCorrida = () => {
    const custoCombustivel = (kmPercorrer / kmPorLitro) * precoCombustivel;
    const lucro = valorCorrida - custoCombustivel;
    const lucroPorKm = lucro / kmPercorrer;

    let avaliacao = "Ruim";
    if (lucroPorKm >= 1.5) {
      avaliacao = "Boa";
    } else if (lucroPorKm >= 1) {
      avaliacao = "Mediana";
    }

    const aceita = lucroPorKm >= 1 ? "Sim" : "Não";

    const lucroTotalPossivel = lucro * quantidadeMaximaCorridas;
    const metaAtingida = lucroTotalPossivel >= metaDiariaLiquida ? "Sim" : "Não";

    setResultado({
      lucro: lucro.toFixed(2),
      lucroPorKm: lucroPorKm.toFixed(2),
      avaliacao,
      aceita,
      lucroTotalPossivel: lucroTotalPossivel.toFixed(2),
      metaAtingida
    });
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.h1 
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}>
        LM Driver
      </motion.h1>

      <Card className="w-full max-w-md bg-gray-900 border border-gray-700">
        <CardContent className="space-y-4 p-6">
          <div>
            <Label>Valor da Corrida (R$)</Label>
            <Input type="number" value={valorCorrida} onChange={(e) => setValorCorrida(parseFloat(e.target.value))} />
          </div>
          <div>
            <Label>Distância a Percorrer (km)</Label>
            <Input type="number" value={kmPercorrer} onChange={(e) => setKmPercorrer(parseFloat(e.target.value))} />
          </div>
          <div>
            <Label>Consumo do Carro (km/l)</Label>
            <Input type="number" value={kmPorLitro} onChange={(e) => setKmPorLitro(parseFloat(e.target.value))} />
          </div>
          <div>
            <Label>Preço do Combustível (R$/litro)</Label>
            <Input type="number" value={precoCombustivel} onChange={(e) => setPrecoCombustivel(parseFloat(e.target.value))} />
          </div>
          <div>
            <Label>Quantidade Máxima de Corridas no Dia</Label>
            <Input type="number" value={quantidadeMaximaCorridas} onChange={(e) => setQuantidadeMaximaCorridas(parseFloat(e.target.value))} />
          </div>
          <div>
            <Label>Meta Diária Líquida (R$)</Label>
            <Input type="number" value={metaDiariaLiquida} onChange={(e) => setMetaDiariaLiquida(parseFloat(e.target.value))} />
          </div>

          <Button className="w-full mt-4" onClick={calcularCorrida}>
            Calcular Corrida
          </Button>

          {resultado && (
            <motion.div
              className="mt-6 bg-gray-800 p-4 rounded-xl shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}>
              <p><strong>Lucro estimado:</strong> R$ {resultado.lucro}</p>
              <p><strong>Lucro por km:</strong> R$ {resultado.lucroPorKm}</p>
              <p><strong>Avaliação:</strong> {resultado.avaliacao}</p>
              <p><strong>Você deve aceitar?</strong> {resultado.aceita}</p>
              <p><strong>Lucro total possível hoje:</strong> R$ {resultado.lucroTotalPossivel}</p>
              <p><strong>Meta diária será atingida?</strong> {resultado.metaAtingida}</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
