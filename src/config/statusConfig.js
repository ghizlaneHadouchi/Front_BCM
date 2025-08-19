// src/config/statusConfig.js
import { CiCircleCheck, CiCircleRemove } from 'react-icons/ci'
import { CgDanger } from 'react-icons/cg'
import {
  TbClockPause,
  TbArrowAutofitDown,
  TbSend,
  TbCheck,
  TbChecks,
  TbX,
  TbLoader,
  TbAlertTriangle,
  TbCircleCheck,
  TbFilePlus,
  TbArchive,
} from 'react-icons/tb'
import {
  MdOutlineAvTimer,
  MdWarning,
  MdAutorenew,
  MdOutlineEditNote,
  MdOutlinePublishedWithChanges,
} from 'react-icons/md'
import { FaRegCheckCircle, FaRegTimesCircle, FaTasks } from 'react-icons/fa'

// Processing Status configurations represent the internal workflow states
export const processingStatusConfig = {
  N_A: {
    label: 'N/A',
    backgroundColor: '#F5F5F5', // Light gray for inactive states
    textColor: '#757575',
    icon: TbClockPause,
  },
  STARTED_EXTRACTION: {
    label: 'Started Extraction',
    backgroundColor: '#89CFF0', // Light blue indicates active process
    textColor: 'blue',
    icon: MdOutlineAvTimer,
  },
  EXTRACTION_IN_PROGRESS: {
    label: 'Extraction In Progress',
    backgroundColor: '#89CFF0',
    textColor: 'blue',
    icon: MdOutlineAvTimer,
  },
  EXTRACTION_COMPLETED: {
    label: 'Extraction Completed',
    backgroundColor: 'rgba(0,245,0,0.2)', // Light green indicates success
    textColor: 'green',
    icon: CiCircleCheck,
  },
  EXTRACTION_FAILED: {
    label: 'Extraction Failed',
    backgroundColor: 'rgba(245,0,0,0.2)', // Light red indicates failure
    textColor: '#8B0000',
    icon: CgDanger,
  },
  TRANSFORMATION_IN_PROGRESS: {
    label: 'Transformation In Progress',
    backgroundColor: '#89CFF0',
    textColor: 'blue',
    icon: MdOutlineAvTimer,
  },
  TRANSFORMATION_COMPLETED: {
    label: 'Transformation Completed',
    backgroundColor: 'rgba(0,245,0,0.2)',
    textColor: 'green',
    icon: CiCircleCheck,
  },
  TRANSFORMATION_FAILED: {
    label: 'Transformation Failed',
    backgroundColor: 'rgba(245,0,0,0.2)',
    textColor: '#8B0000',
    icon: CgDanger,
  },
  SEND_IN_PROGRESS: {
    label: 'Send In Progress',
    backgroundColor: '#89CFF0',
    textColor: 'blue',
    icon: MdOutlineAvTimer,
  },
  SEND_COMPLETED: {
    label: 'Send Completed',
    backgroundColor: 'rgba(0,245,0,0.2)',
    textColor: 'green',
    icon: CiCircleCheck,
  },
  SEND_FAILED: {
    label: 'Send Failed',
    backgroundColor: 'rgba(245,0,0,0.2)',
    textColor: '#8B0000',
    icon: CgDanger,
  },
  REJECTION_IN_PROGRESS: {
    label: 'Rejection In Progress',
    backgroundColor: '#89CFF0',
    textColor: 'blue',
    icon: MdOutlineAvTimer,
  },
  REJECTION_COMPLETED: {
    label: 'Rejection Completed',
    backgroundColor: 'rgba(0,245,0,0.2)',
    textColor: 'green',
    icon: CiCircleCheck,
  },
  REJECTION_FAILED: {
    label: 'Rejection Failed',
    backgroundColor: 'rgba(245,0,0,0.2)',
    textColor: '#8B0000',
    icon: CgDanger,
  },
}

export const batchJobStatusConfig = {
  COMPLETED: {
    label: 'Completed',
    backgroundColor: 'rgba(0,245,0,0.2)',
    textColor: 'green',
    icon: CiCircleCheck,
  },
  STARTING: {
    label: 'Starting',
    backgroundColor: '#89CFF0',
    textColor: 'blue',
    icon: MdOutlineAvTimer,
  },
  STARTED: {
    label: 'En Cours',
    backgroundColor: '#89CFF0',
    textColor: 'blue',
    icon: MdOutlineAvTimer,
  },
  STOPPING: {
    label: 'Stopping',
    backgroundColor: '#FFF9C4',
    textColor: '#856404',
    icon: TbClockPause,
  },
  STOPPED: {
    label: 'Stopped',
    backgroundColor: '#FFF9C4',
    textColor: '#856404',
    icon: TbClockPause,
  },
  FAILED: {
    label: 'Failed',
    backgroundColor: 'rgba(245,0,0,0.2)',
    textColor: '#8B0000',
    icon: CgDanger,
  },
  ABANDONED: {
    label: 'Abandoned',
    backgroundColor: 'rgba(245,0,0,0.2)',
    textColor: '#8B0000',
    icon: CgDanger,
  },
  UNKNOWN: {
    label: 'Unknown',
    backgroundColor: '#E0E0E0',
    textColor: '#666666',
    icon: MdWarning,
  },
}

// BKAM Communication Status configurations represents the external communication states
export const bkamStatusConfig = {
  N_A: {
    label: 'N/A',
    backgroundColor: '#F5F5F5',
    textColor: '#757575',
    icon: TbClockPause,
  },
  EN_ATTENTE_BKAM: {
    label: 'Awaiting BKAM',
    backgroundColor: '#FFF9C4', // Light yellow indicates waiting state
    textColor: '#856404',
    icon: TbClockPause,
  },
  NOT_STARTED: {
    label: 'Not Started',
    backgroundColor: '#E0E0E0', // Gray indicates inactive state
    textColor: '#666666',
    icon: TbClockPause,
  },
  ERREUR: {
    label: 'Error',
    backgroundColor: 'rgba(245,0,0,0.2)',
    textColor: '#8B0000',
    icon: CgDanger,
  },
  EN_COURS: {
    label: 'In Progress',
    backgroundColor: '#89CFF0',
    textColor: 'blue',
    icon: MdOutlineAvTimer,
  },
  ACCEPTE_TOTALEMENT: {
    label: 'Fully Accepted',
    backgroundColor: 'rgba(0,245,0,0.2)', // Light green for full acceptance
    textColor: 'green',
    icon: CiCircleCheck,
  },
  ACCEPTE_TOTALEMENT_WITH_WARNINGS: {
    label: 'Fully Accepted with Warnings',
    backgroundColor: 'rgba(255,204,0,0.2)', // Light yellow for warnings
    textColor: '#B38700', // Darker yellow for contrast
    icon: MdWarning,
  },
  REJET_TOTAL: {
    label: 'Total Rejection',
    backgroundColor: 'rgba(245,0,0,0.2)', // Light red for full rejection
    textColor: '#8B0000',
    icon: CgDanger,
  },
  REJET_PARTIEL: {
    label: 'Partial Rejection',
    backgroundColor: 'rgba(255,165,0,0.2)', // Orange for partial rejection
    textColor: '#CC5500', // Dark orange text
    icon: CgDanger,
  },
}

export const cronStatusConfig = {
  PLANIFIÉ: {
    label: 'Scheduled',
    backgroundColor: 'rgba(0,245,0,0.2)',
    textColor: 'green',
    icon: CiCircleCheck,
  },
  EN_COURS: {
    label: 'In Progress',
    backgroundColor: '#89CFF0',
    textColor: 'blue',
    icon: MdOutlineAvTimer,
  },
  ERREUR: {
    label: 'Error',
    backgroundColor: 'rgba(245,0,0,0.2)',
    textColor: '#8B0000',
    icon: CgDanger,
  },
  STOPPED: {
    label: 'Stopped',
    backgroundColor: '#FFF9C4',
    textColor: '#856404',
    icon: TbClockPause,
  },
  COMPLETED: {
    label: 'Completed',
    backgroundColor: 'rgba(0,245,0,0.2)',
    textColor: 'green',
    icon: CiCircleCheck,
  },
  UNKNOWN: {
    label: 'Unknown',
    backgroundColor: '#E0E0E0',
    textColor: '#666666',
    icon: MdWarning,
  },
}

// SMP Status configurations for sending and receiving statuses
export const smpBkamStatusConfig = {
  AWAITING: {
    label: 'Awaiting',
    backgroundColor: '#FFF9C4', // Light yellow indicates waiting state
    textColor: '#856404',
    icon: TbClockPause,
  },
  SENT: {
    label: 'Sent',
    backgroundColor: 'rgba(0,245,0,0.2)', // Light green
    textColor: 'green',
    icon: TbSend,
  },
  RECEIVED: {
    label: 'Received',
    backgroundColor: '#007bff33', // Calm blue tone
    textColor: '#007BFF',
    icon: CiCircleCheck,
  },
  VALIDATED: {
    label: 'Validated',
    backgroundColor: 'rgba(0,245,0,0.2)',
    textColor: 'green',
    icon: CiCircleCheck,
  },
  REJECTED: {
    label: 'Rejected',
    backgroundColor: 'rgba(255,0,0,0.2)', // Soft red
    textColor: '#D32F2F',
    icon: CiCircleRemove,
  },
  IN_PROGRESS: {
    label: 'In Progress',
    backgroundColor: '#89CFF0',
    textColor: 'blue',
    icon: MdOutlineAvTimer,
  },
  ERROR: {
    label: 'Error',
    backgroundColor: 'rgba(244,67,54,0.2)', // More intense red
    textColor: '#F44336',
    icon: TbAlertTriangle,
  },
  ACCEPTED: {
    label: 'Accepted',
    backgroundColor: 'rgba(0,200,83,0.15)', // Peaceful green
    textColor: '#00C853',
    icon: TbCircleCheck,
  },
}

export const smpReportStatusConfig = {
  IN_PROGRESS: {
    label: 'In Progress',
    backgroundColor: '#89CFF0', // Light blue = actively working
    textColor: 'blue',
    icon: MdOutlineAvTimer,
  },
  GENERATED: {
    // label: 'Generated',
    label: 'Généré',
    backgroundColor: 'rgba(0,200,83,0.15)', // Greenish hue = done
    textColor: '#00C853',
    icon: TbFilePlus,
  },
  ERROR: {
    label: 'Error',
    backgroundColor: 'rgba(245,0,0,0.2)', // Light red
    textColor: '#8B0000',
    icon: CgDanger,
  },
  SKIPPED: {
    label: 'Skipped',
    backgroundColor: '#F5F5F5', // Neutral grey
    textColor: '#757575',
    icon: TbArrowAutofitDown,
  },
  ALREADY_EXISTS: {
    label: 'Already Exists',
    backgroundColor: '#E0E0E0', // Slightly deeper gray
    textColor: '#616161',
    icon: TbClockPause,
  },
  VALIDATED: {
    label: 'Validated',
    backgroundColor: 'rgba(0,245,0,0.2)', // Light green
    textColor: 'green',
    icon: CiCircleCheck,
  },
  SENT: {
    label: 'Sent',
    backgroundColor: 'rgba(0,245,0,0.2)', // Light green
    textColor: 'green',
    icon: TbSend,
  },
  ARCHIVED: {
    label: 'Archived',
    backgroundColor: '#EDE0D4',
    textColor: '#616161', // Dark grey text
    icon: TbArchive,
  },
}

export const bkamAccountingDeclarationStatusConfig = {
  DRAFT: {
    label: 'Draft',
    backgroundColor: '#F5F5F5', // Light grey, neutral and passive
    textColor: '#757575', // Mid grey text, understated
    icon: MdOutlineEditNote, // Pencil icon fits "draft/editing" state
  },
  DECLARED: {
    label: 'Declared',
    backgroundColor: '#89CFF0', // Light blue indicates active process
    textColor: 'blue', // Blue text for better visibility
    icon: MdOutlineAvTimer, // Using timer icon to indicate in-process state
  },
  ACCEPTED: {
    label: 'Accepted',
    backgroundColor: '#E6F4EA', // Light Green BG
    textColor: '#1E7E34', // Dark Green Text
    icon: CiCircleCheck, // Icon for Completed/Accepted
  },
  REJECTED: {
    label: 'Rejected',
    backgroundColor: '#FDECEA', // Light Red BG
    textColor: '#B71C1C', // Dark Red Text
    icon: CgDanger, // Icon for Error/Danger/Rejected
  },
  N_A: {
    label: 'N/A',
    backgroundColor: '#F5F5F5', // Light gray
    textColor: '#757575',
    icon: TbClockPause, // Icon for Paused/Not Applicable
  },
  CONTROLS_PENDING: {
    label: 'Pending Controls',
    backgroundColor: '#E1F5FE', // Light Blue BG (Consistent with Draft)
    textColor: '#01579B', // Dark Blue Text
    icon: MdOutlineAvTimer, // Pending Action / Timer
  },
  CONTROLS_PROCESSING: {
    label: 'Processing Controls',
    backgroundColor: '#FFF9C4', // Light Yellow BG (Suggests activity)
    textColor: '#F57F17', // Dark Yellow/Orange Text
    icon: MdAutorenew, // Processing / Refresh / Loop icon
  },
  CONTROLS_OK: {
    label: 'Controls OK',
    backgroundColor: '#E6F4EA', // Light Green BG (Consistent with Accepted)
    textColor: '#1E7E34', // Dark Green Text
    icon: FaRegCheckCircle, // OK Check icon
  },
  CONTROLS_KO: {
    // KO = Knock-Out / Failed
    label: 'Controls KO',
    backgroundColor: '#FDECEA', // Light Red BG (Consistent with Rejected)
    textColor: '#B71C1C', // Dark Red Text
    icon: FaRegTimesCircle, // Failed/Error icon (alternative to CgDanger)
  },
  //for perdiocity config :
  // == Period Declaration Overall Statuses (from BkamDeclarationByPeriodicity.OverallStatus) ==
  TO_DECLARE: {
    label: 'To Declare',
    backgroundColor: '#FFF8E1', // 🍦 Softest orange (vanilla glow)
    textColor: '#FB8C00', // Mid-tone orange (warm but calm)
    icon: MdOutlinePublishedWithChanges,
  },
  PARTIALLY_DECLARED: {
    label: 'Partially Declared',
    backgroundColor: '#FFE0B2', // 🍊 Deeper orange (progress happening)
    textColor: '#E65100', // Strong burnt orange (more urgency)
    icon: FaTasks,
  },
  COMPLETED: {
    // Assuming this means all child declarations are ACCEPTED
    label: 'Completed',
    backgroundColor: '#E6F4EA', // Light Green BG (Consistent with Accepted)
    textColor: '#1E7E34', // Dark Green Text
    icon: CiCircleCheck, // Completed/Accepted icon
  },
  UNKNOWN: {
    // Fallback
    label: 'Unknown Status',
    backgroundColor: '#E0E0E0', // Grey
    textColor: '#424242',
    icon: MdWarning,
  },
}

export const getStatusStyle = (status, type = 'processing') => {
  let config
  switch (type) {
    case 'bkam':
      config = bkamStatusConfig
      break
    case 'batch':
      config = batchJobStatusConfig
      break
    case 'bkam-accounting-declaration':
      config = bkamAccountingDeclarationStatusConfig
      break
    case 'cron':
      config = cronStatusConfig
      break
    case 'smpBkam':
      config = smpBkamStatusConfig
      break
    case 'smpWorkflow':
      config = smpReportStatusConfig
      break
    default:
      config = processingStatusConfig
  }

  const statusConfig = config[status] || {
    label: status,
    backgroundColor: '#E0E0E0',
    textColor: '#666666',
    icon: MdOutlineAvTimer,
  }

  return {
    backgroundColor: statusConfig.backgroundColor,
    color: statusConfig.textColor,
  }
}

export const getStatusLabel = (status, type = 'processing', t) => {
  let config
  switch (type) {
    case 'bkam':
      config = bkamStatusConfig
      break
    case 'bkam-accounting-declaration':
      config = bkamAccountingDeclarationStatusConfig
      break
    case 'batch':
      config = batchJobStatusConfig
      break
    case 'cron':
      config = cronStatusConfig
      break
    case 'smpBkam':
      config = smpBkamStatusConfig
      break
    case 'smpWorkflow':
      config = smpReportStatusConfig
      break
    default:
      config = processingStatusConfig
  }

  const statusConfig = config[status] || {
    label: status,
    backgroundColor: '#E0E0E0',
    textColor: '#666666',
    icon: MdOutlineAvTimer,
  }
  return t ? t(statusConfig.label) : statusConfig.label
}

export const getStatusIcon = (status, type = 'processing') => {
  let config
  switch (type) {
    case 'bkam':
      config = bkamStatusConfig
      break
    case 'bkam-accounting-declaration':
      config = bkamAccountingDeclarationStatusConfig
      break
    case 'batch':
      config = batchJobStatusConfig
      break
    case 'cron':
      config = cronStatusConfig
      break
    case 'smpBkam':
      config = smpBkamStatusConfig
      break
    case 'smpWorkflow':
      config = smpReportStatusConfig
      break
    default:
      config = processingStatusConfig
  }

  const statusConfig = config[status] || {
    label: status,
    backgroundColor: '#E0E0E0',
    textColor: '#666666',
    icon: MdOutlineAvTimer,
  }
  return statusConfig.icon
}

export const getStatusConfig = (status, type = 'processing') => {
  let config
  switch (type) {
    case 'bkam':
      config = bkamStatusConfig
      break
    case 'bkam-accounting-declaration':
      config = bkamAccountingDeclarationStatusConfig
      break
    case 'batch':
      config = batchJobStatusConfig
      break
    case 'cron':
      config = cronStatusConfig
      break
    case 'smpBkam':
      config = smpBkamStatusConfig
      break
    case 'smpWorkflow':
      config = smpReportStatusConfig
      break
    default:
      config = processingStatusConfig
  }

  return (
    config[status] || {
      label: status,
      backgroundColor: '#E0E0E0',
      textColor: '#666666',
      icon: MdOutlineAvTimer,
    }
  )
}
