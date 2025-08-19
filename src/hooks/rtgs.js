import { useEffect, useState } from 'react'

export const getRTGS = () => {
  const [events, setEvents] = useState([])
  const [isDashboardloading, setIsDashboardloading] = useState(true)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/rtgs/get`, {
          method: 'GET',
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setEvents(data)
        setIsDashboardloading(false)
      } catch (error) {
        setIsDashboardloading(false)
        console.log("can't get data", error)
      }
    }
    fetchEvents()
  }, [])

  return { events, isDashboardloading }
}

export const getRTGSForTable = () => {
  const [mvsResForTable, setMvsResForTable] = useState([])
  const [isTableLoading, setIsTableLoading] = useState(true)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/rtgs/getDataForTable`, {
          method: 'GET',
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setMvsResForTable(data)
        setIsTableLoading(false)
      } catch (error) {
        setIsTableLoading(false)
        console.log("can't get data", error)
      }
    }
    fetchEvents()
  }, [])

  return { mvsResForTable, isTableLoading }
}

export const getMvsResByParticipantsAndMonth = () => {
  const [mvsResByParticipantsAndMonth, setMvsResByParticipantsAndMonth] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/rtgs/getDataByParticipantsAndMonth`, {
          method: 'GET',
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setMvsResByParticipantsAndMonth(data)
      } catch (error) {
        console.log("Can't get calendar events:", error)
      }
    }
    fetchEvents()
  }, [])

  return mvsResByParticipantsAndMonth
}

export const getMvsResByMonth = () => {
  const [mvsResByMonth, setMvsResByMonth] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/rtgs/getDataByMonth`, {
          method: 'GET',
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setMvsResByMonth(data)
      } catch (error) {
        console.log("Can't get calendar events:", error)
      }
    }
    fetchEvents()
  }, [])

  return mvsResByMonth
}

export const getMvsResByParticipantsAndStatus = () => {
  const [mvsResByParticipantsAndStatus, setMvsResByParticipantsAndStatus] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/rtgs/getDataByParticipantsAndStatus`, {
          method: 'GET',
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setMvsResByParticipantsAndStatus(data)
      } catch (error) {
        console.log("Can't get calendar events:", error)
      }
    }
    fetchEvents()
  }, [])

  return mvsResByParticipantsAndStatus
}

export const getParticipantsStats = (startDate, endDate) => {
  const [participantsStats, setParticipantsStats] = useState([])
  const [isParticipantsStatsLoading, setIsParticipantsStatsLoading] = useState(true)
  useEffect(() => {
    const fetchEvents = async () => {
      if (!startDate || !endDate) {
        setIsParticipantsStatsLoading(false)
        return
      }
      try {
        const res = await fetch(
          `/api/rtgs/getParicipantsStats?startDate=${startDate}&endDate=${endDate}`,
          {
            method: 'GET',
          },
        )
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setParticipantsStats(data)
        setIsParticipantsStatsLoading(false)
      } catch (error) {
        setIsParticipantsStatsLoading(false)
        console.log("can't get data", error)
      }
    }
    fetchEvents()
  }, [startDate, endDate])

  return { participantsStats, isParticipantsStatsLoading }
}

export const createMvsRTGS = async (formData) => {
  try {
    const res = await fetch('/api/rtgs/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: formData.amount,
        businessdate: formData.businessdate,
        currencycode: formData.currencycode,
        t_from: formData.t_from,
        processingstatus: formData.processingstatus,
        t_to: formData.t_to,
      }),
    })
    const data = await res.json()
    if (data.success === false) {
      console.error('Error saving data')
      return
    }
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}
