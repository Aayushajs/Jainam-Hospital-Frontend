import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers'

export default function AdvanceBooking() {
  const { control, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log('Advance booking submitted:', data)
    // Handle form submission
  }

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>Advance Medicine Booking</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Controller
                name="medicineName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Medicine Name"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="quantity"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Quantity"
                    type="number"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="pickupDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    label="Pickup Date"
                    minDate={new Date()}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth required />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="prescription"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Prescription Details"
                    multiline
                    rows={4}
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 2 }}
              >
                Book Medicine
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Box sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Why Book in Advance?</Typography>
        <ul>
          <li><Typography>Guaranteed availability of medicines</Typography></li>
          <li><Typography>Skip the queue with priority pickup</Typography></li>
          <li><Typography>Get reminders for pickup</Typography></li>
        </ul>
      </Box>
    </Container>
  )
}