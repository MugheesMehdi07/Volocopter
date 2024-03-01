import * as React from 'react';
import { Grid, Card, CardContent, Typography, Button, Snackbar, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const FlightMissionControl: React.FC = () => {
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);

  const handleAddMission = (): void => {
    // Your logic to add a mission
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Grid container spacing={2} sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Pre-Flight */}
      <Grid item xs={12} md={4}>
        <Typography variant="h6" sx={{ mb: 2 }}>Pre-Flight</Typography>
        {/* Mission Cards */}
        <Card sx={{ mb: 2, boxShadow: 3 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Urban Traffic Analysis</Typography>
            <IconButton><InfoOutlinedIcon /></IconButton>
          </CardContent>
        </Card>
        {/* Add more cards as needed */}
      </Grid>

      {/* Flight */}
      <Grid item xs={12} md={4}>
        <Typography variant="h6" sx={{ mb: 2 }}>Flight</Typography>
        {/* Mission Cards */}
        <Card sx={{ mb: 2, boxShadow: 3 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Wildlife Surveillance</Typography>
            <IconButton><InfoOutlinedIcon /></IconButton>
          </CardContent>
        </Card>
        {/* Add more cards as needed */}
      </Grid>

      {/* Post-Flight */}
      <Grid item xs={12} md={4}>
        <Typography variant="h6" sx={{ mb: 2 }}>Post-Flight</Typography>
        {/* Mission Cards */}
        <Card sx={{ mb: 2, boxShadow: 3 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Heritage Preservation</Typography>
            <IconButton><InfoOutlinedIcon /></IconButton>
          </CardContent>
        </Card>
        {/* Add more cards as needed */}
        <Button 
          startIcon={<AddIcon />} 
          onClick={handleAddMission} 
          sx={{ 
            mt: 2, 
            backgroundColor: 'primary.main', 
            '&:hover': { backgroundColor: 'primary.dark' },
            color: 'white',
          }}
        >
          ADD MISSION
        </Button>
      </Grid>
      
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Successfully created mission"
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: 'success.main',
          },
        }}
      />
    </Grid>
  );
};

export default FlightMissionControl;
