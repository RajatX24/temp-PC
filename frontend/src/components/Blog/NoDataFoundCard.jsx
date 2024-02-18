import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export default function MediaCard({imgLink}) {
  return (
    <Card sx={{ maxWidth: 345}} style={{margin:'20vh auto'}}>
      <CardMedia
        sx={{ height: 140 }}
        image={imgLink}
        title="no data found"
      />
    </Card>
  );
}
