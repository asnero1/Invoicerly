import { useEffect, useState } from 'react'

export const useSmartDetection = (
  description: string,
  knownClients: string[]
) => {
  const [suggestedClient, setSuggestedClient] = useState<string>('')
  const [suggestedBillable, setSuggestedBillable] = useState<boolean>(false)

  useEffect(() => {
    const lowerDesc = description?.toLowerCase() ?? ''

    if (!lowerDesc.trim()) {
      setSuggestedClient('')
      setSuggestedBillable(false)
      return
    }

    const billableKeywords = [
      'invoice',
      'bill',
      'charged',
      'consulting',
      'payment',
      'quote',
    ]
    const isBillable = billableKeywords.some((word) => lowerDesc.includes(word))
    setSuggestedBillable(isBillable)

    const matchedClient = knownClients.find((client) =>
      lowerDesc.includes(client.toLowerCase())
    )

    setSuggestedClient(matchedClient ?? '')
  }, [description, knownClients])

  return { suggestedClient, suggestedBillable }
}

