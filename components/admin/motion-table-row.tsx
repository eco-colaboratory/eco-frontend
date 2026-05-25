'use client';

import { motion } from 'framer-motion';

import { TableRow } from '@/components/ui/table';
import { adminStaggerItem } from '@/lib/admin/motion';

export const MotionTableRow = motion.create(TableRow);

export const motionTableRowProps = {
  variants: adminStaggerItem,
};
