import React, { CSSProperties } from 'react';
import { ButtonProps, Button as MantineButton, MantineStyleProp } from '@mantine/core';
import { buttonVariants } from './styles';

export enum LinkTarget {
  Blank = '_blank',
  Self = '_self',
  Parent = '_parent',
  Top = '_top',
}

interface SharedButtonProps extends Omit<ButtonProps, 'style'> {
  style?: CSSProperties;
  variant?: keyof typeof buttonVariants;
  onClick?: () => void;
  href?: string;
  target?: LinkTarget;
  rel?: string;
}

export const Button = ({ 
  style = {}, 
  variant = 'primary',
  href,
  target,
  rel,
  ...props 
}: SharedButtonProps) => {
  const variantStyle = buttonVariants[variant];
  const mergedStyle: MantineStyleProp = { 
    ...variantStyle, 
    ...style 
  } as MantineStyleProp;

  const isExternalLink = Boolean(href);
  
  const linkProps = isExternalLink ? {
    component: 'a' as const, 
    href, 
    target, 
    rel: target === LinkTarget.Blank ? rel || 'noopener noreferrer' : rel,
    } : {};

  return (
    <MantineButton 
      style={mergedStyle} 
      {...linkProps} 
      {...props} 
    />
  );
};
