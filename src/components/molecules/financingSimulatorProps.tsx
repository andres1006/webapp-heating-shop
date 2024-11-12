import { useEffect, useState } from 'react'
import Select from '../organisms/select'
import { Input } from '../ui/input'

type FinancingSimulatorProps = {
  onSimulationComplete?: (monthlyPayment: number) => void
}

const FinancingSimulator = ({ onSimulationComplete }: FinancingSimulatorProps) => {
  const [amount, setAmount] = useState<number>(0)
  const [term, setTerm] = useState<number>(12) // Default to 12 months
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null)

  const calculateMonthlyPayment = () => {
    const interestRate = 0.05 // Example interest rate of 5%
    const totalAmount = amount * (1 + interestRate)
    const payment = totalAmount / term
    setMonthlyPayment(payment)
    onSimulationComplete && onSimulationComplete(payment)
  }

  useEffect(() => {
    calculateMonthlyPayment()
  }, [amount, term])

  return (
    <div className="my-8">
      <div className="mb-4">
        <label className="block mb-2">Monto del Préstamo</label>
        <Input
          type="number"
          placeholder="Monto del Préstamo"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Plazo (meses)</label>
        <Select
          value={String(term || '')}
          placeholder="Selecciona un plazo"
          onChange={(e) => setTerm(Number(e))}
          options={[6, 12, 24, 36].map((option) => ({ value: String(option), label: `${option} meses` }))}
        />
      </div>
      {monthlyPayment !== null && (
        <p className="mt-4 text-green-600 font-semibold text-lg">Cuota Mensual: ${monthlyPayment.toFixed(2)}</p>
      )}
    </div>
  )
}

export default FinancingSimulator
