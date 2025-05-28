import { Container, Typography, Box, Stepper, Step, StepLabel, Paper } from '@mui/material'
import { LocalShipping, Inventory, CheckCircle, Payment } from '@mui/icons-material'

const steps = [
  { label: 'Order Placed', date: '2023-07-20 10:00 AM' },
  { label: 'Payment Confirmed', date: '2023-07-20 10:05 AM' },
  { label: 'Processing', date: '2023-07-20 11:30 AM' },
  { label: 'Shipped', date: '2023-07-21 09:00 AM' },
  { label: 'Delivered', date: '2023-07-22 03:15 PM' }
]

export default function TrackOrder() {
  const activeStep = 3

  const getStepIcon = (label) => {
    switch(label) {
      case 'Order Placed': return <Inventory />;
      case 'Payment Confirmed': return <Payment />;
      case 'Shipped': 
      case 'Delivered': return <LocalShipping />;
      default: return <CheckCircle />;
    }
  }

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>Track Your Order</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} completed={index < activeStep}>
              <StepLabel
                icon={getStepIcon(step.label)}
                optional={<Typography variant="caption">{step.date}</Typography>}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Box sx={{ p: 3, border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>Order Details</Typography>
        <Typography>Order ID: ORD-001</Typography>
        <Typography>Estimated Delivery: July 22, 2023</Typography>
        <Typography>Carrier: PharmaExpress Logistics</Typography>
      </Box>
    </Container>
  )
}