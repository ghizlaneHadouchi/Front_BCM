import { useEffect, useState } from 'react'

export const getAllIncidents = () => {
  const [incidents, setIncidents] = useState([])
  const [isTableLoading, setIsTableLoading] = useState(true)
  const normalizeKeysToLowerCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(normalizeKeysToLowerCase);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key.toLowerCase()] = normalizeKeysToLowerCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/incident/getAll`, {
          method: 'GET',
        })
        const data = await res.json()
        console.log(data);
        if (data.success === false) {
          console.log(data.message)
          return
        }
         // 🔽 Normalize keys here
      const normalizedData = normalizeKeysToLowerCase(data);
        setIncidents(data)
        setIsTableLoading(false)
      } catch (error) {
        console.log("Can't get calendar events:", error)
        setIsTableLoading(false)
      }
    }
    fetchEvents()
  }, [])

  return { incidents, isTableLoading }
}




const formatDateOnly = (date) => {
  if (!date) return null;
  const d = new Date(date);
  if (isNaN(d)) return null;
  return d.toISOString().split('T')[0];
};

export const createIncident = async (formData) => {
  // Build payload using camelCase keys (as in your Postman test)
  const payload = {
    reportedBy: formData.reportedBy ?? '',
    reportedDate: formatDateOnly(formData.reportedDate),
    incidentType: formData.incidentType ?? '',
    maxDeliveryDate: formData.maxDeliveryDate || null, // or format if needed
    system: formData.system ?? '',
    severityLevel: formData.severityLevel ?? '',
    description: formData.description ?? '',
    status: formData.status ?? '',
    assignedTo: formData.assignedTo ?? '',
    resolutionDescription: formData.resolutionDescription ?? '',
    correctionDate: formData.correctionDate || null, // or formatDateOnly if you only want YYYY-MM-DD
  };

  console.log('[createIncident] Payload → backend:', payload);

  try {
    const res = await fetch('/api/incident/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log('[createIncident] HTTP status:', res.status);

    const data = await res.json().catch(() => ({}));
    console.log('[createIncident] Backend JSON:', data);

    if (!res.ok || data?.success === false) {
      console.error('[createIncident] API error:', data?.message || data?.error || 'Unknown');
      return;
    }

    return data;
  } catch (error) {
    console.error('[createIncident] Network/other error:', error);
  }
};



export const getIncidentsForTableDashboard = () => {
  const [dashboardData, setDashboardData] = useState([])
  const [isDashboardloading, setIsDashboardloading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/incident/getForTableDashboard`, {
          method: 'GET',
        })
        const data = await res.json()
        if (data.success === false) {
          setError(data.message)
          console.log(data.message)
          return
        }
        setDashboardData(data)
        setIsDashboardloading(false)
      } catch (error) {
        console.log("Can't get calendar events:", error)
        setError('An error occurred while fetching the data.')
        setIsDashboardloading(false)
      }
    }
    fetchEvents()
  }, [])

  return { dashboardData, isDashboardloading, error }
}

export const getIncidentsByParticipantsAndSeverityLevel = () => {
  const [incidentsByParticipantsAndSeverityLevel, setIncidentsByParticipantsAndSeverityLevel] =
    useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/incident/getDataByParticipantsAndSeverityLevel`, {
          method: 'GET',
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setIncidentsByParticipantsAndSeverityLevel(data)
      } catch (error) {
        console.log("Can't get calendar events:", error)
      }
    }
    fetchEvents()
  }, [])

  return incidentsByParticipantsAndSeverityLevel
}

export const getIncidentsByParticipants = () => {
  const [incidentsByParticipants, setIncidentsByParticipants] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/incident/getDataByParticipants`, {
          method: 'GET',
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setIncidentsByParticipants(data)
      } catch (error) {
        console.log("Can't get calendar events:", error)
      }
    }
    fetchEvents()
  }, [])

  return incidentsByParticipants
}

export const getIncidentsBySeverityLevel = () => {
  const [incidentsBySeverityLevel, setIncidentsBySeverityLevel] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/incident/getDataBySeverityLevel`, {
          method: 'GET',
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setIncidentsBySeverityLevel(data)
      } catch (error) {
        console.log("Can't get calendar events:", error)
      }
    }
    fetchEvents()
  }, [])

  return incidentsBySeverityLevel
}

export const getIncidentsByStatus = () => {
  const [incidentsByStatus, setIncidentsByStatus] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/incident/getDataByStatus`, {
          method: 'GET',
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setIncidentsByStatus(data)
      } catch (error) {
        console.log("Can't get calendar events:", error)
      }
    }
    fetchEvents()
  }, [])

  return incidentsByStatus
}

export const getIncidentsBySystem = () => {
  const [incidentsBySystem, setIncidentsBySystem] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/incident/getDataBySystem`, {
          method: 'GET',
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setIncidentsBySystem(data)
      } catch (error) {
        console.log("Can't get calendar events:", error)
      }
    }
    fetchEvents()
  }, [])

  return incidentsBySystem
}

export const getTotalIncidentsAndNonResolvedByParticipants = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/incident/getTotalIncidentsAndNonResolvedByParticipants`, {
          method: 'GET',
        })
        const data = await res.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setEvents(data)
      } catch (error) {
        console.log("Can't get calendar events:", error)
      }
    }
    fetchEvents()
  }, [])

  return events
}

export const updateIncident = async (id, Status, CorrectionDate, ResolutionDescription) => {
  try {
    const res = await fetch(`/api/incident/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Status: Status,
        CorrectionDate: CorrectionDate,
        ResolutionDescription: ResolutionDescription,
      }),
    })

    const updatedIncident = await res.json()

    if (res.ok) {
      return updatedIncident
    } else {
      console.error('Error updating data:', updatedIncident.error || 'Unknown error')
      return
    }
  } catch (error) {
    console.error('Error making the request:', error)
    return
  }
}
