import type { DroneService } from '../types/types';

export const toSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const getServiceImage = (service: DroneService): string => {

  return service.image_url || '';
};

export const getServiceVideo = (service: DroneService): string | undefined => {
  if (!service.image_url) return undefined;
  
  const baseName = service.image_url.replace('.webp', '').replace('.jpg', '').replace('.png', '');
  return `${baseName}.mp4`;
};

export const getServiceVideoSmall = (service: DroneService): string | undefined => {
  if (!service.image_url) return undefined;
  
  const baseName = service.image_url.replace('.webp', '').replace('.jpg', '').replace('.png', '');
  return `${baseName}-sm.mp4`;
};

export const getServiceVideoLarge = (service: DroneService): string | undefined => {
  if (!service.image_url) return undefined;
  
  const baseName = service.image_url.replace('.webp', '').replace('.jpg', '').replace('.png', '');
  return `${baseName}-lg.mp4`;
};

export const getServiceVideoResponsive = (service: DroneService, isMobile?: boolean): string | undefined => {
  if (!service.image_url) return undefined;
  
  const baseName = service.image_url.replace('.webp', '').replace('.jpg', '').replace('.png', '');
  
  if (isMobile) {
    return `${baseName}-sm.mp4`;
  }
  
  return `${baseName}-lg.mp4`;
};