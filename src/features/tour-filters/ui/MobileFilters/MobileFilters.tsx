import { useState } from 'react';
import { Drawer, IconButton } from '@mui/material';
import { Close, FilterList } from '@mui/icons-material';
import { TourFilters } from '../TourFilters';
import './MobileFilters.scss';

export const MobileFilters = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mobile-filters__button">
        <IconButton
          onClick={() => setOpen(true)}
          className="mobile-filters__trigger"
          color="primary"
          size="large"
        >
          <FilterList />
          <span>Фильтры</span>
        </IconButton>
      </div>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        className="mobile-filters__drawer"
        PaperProps={{
          className: 'mobile-filters__paper',
        }}
      >
        <div className="mobile-filters__header">
          <h3 className="mobile-filters__title">Фильтры</h3>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </div>
        <div className="mobile-filters__content">
          <TourFilters />
        </div>
      </Drawer>
    </>
  );
};
