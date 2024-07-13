import React from 'react';
import { Card, CardContent, CardActionArea } from '@mui/material';

import './css/CategoryWiseSupport.css';

const CategoryWiseSupport = ({ Icon }) => {
  return (
    <Card className="support-category-card" data-testid="support-category-card">
      <CardActionArea>
        <CardContent
          style={{ textAlign: 'center' }}
          data-testid="support-card-content"
        >
          <Icon data-testid="support-category-icon" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryWiseSupport;
