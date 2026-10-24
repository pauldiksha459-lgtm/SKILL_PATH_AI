import React from 'react';

interface CompanyLogoProps {
  companyId: string;
  name?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  forceLightBg?: boolean;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  companyId,
  name = '',
  className = '',
  size = 'md',
  forceLightBg,
}) => {
  const normalizedId = companyId.toLowerCase().replace(/[^a-z0-9]/g, '');

  const sizeClasses = {
    xs: 'w-5 h-5 rounded-md',
    sm: 'w-6 h-6 rounded-lg',
    md: 'w-9 h-9 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
    xl: 'w-16 h-16 rounded-2xl',
  };

  const iconSizes = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  // Determine whether this brand needs a light surface container for contrast
  const needsLightSurface =
    forceLightBg !== undefined
      ? forceLightBg
      : ['apple', 'deloitte', 'ey', 'uber', 'amazon'].includes(normalizedId);

  const renderVectorLogo = () => {
    switch (normalizedId) {
      // 1. Google (Official 4-color "G")
      case 'google':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>
        );

      // 2. Microsoft (Official 4 squares)
      case 'microsoft':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
            <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
            <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
            <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
          </svg>
        );

      // 3. Amazon (Official Smile curve)
      case 'amazon':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M15.42 16.32c-3.1 2.29-7.55 3.51-11.45 2.15-.55-.19-.1-.83.33-.87 3.48-.3 6.94-1.67 9.8-3.79.43-.32.9.2.42.51z"
              fill="#FF9900"
            />
            <path
              d="M16.5 14.88c-.39-.5-2.6-.24-3.59-.12-.3.04-.35-.22-.08-.41 1.77-1.24 4.67-.88 5.01-.45.34.42-.09 3.32-1.74 4.69-.25.21-.49.1-.38-.17.38-.97.94-2.88.78-3.54z"
              fill="#FF9900"
            />
            <path
              d="M12.65 3C7.5 3 4.2 6.64 4.2 10.3c0 2.22 1.15 3.96 2.83 4.68.32.14.62.02.71-.35.07-.27.22-.9.28-1.16.08-.34-.05-.46-.3-.77-.73-.9-1.2-2.12-1.2-3.4 0-2.6 1.9-4.96 4.95-4.96 2.65 0 4.1 1.62 4.1 3.99 0 2.62-1.15 4.62-2.58 4.62-.85 0-1.49-.7-1.28-1.56.24-1.03.71-2.14.71-2.89 0-.67-.36-1.1-1-.1-1.01 0-1.83.69-1.83 1.62 0 .59.2 1 .2 1s-.98 4.14-1.15 4.88c-.34 1.48-.05 3.28-.02 3.47.02.12.16.15.23.06.1-.14 1.42-1.77 1.87-3.4.06-.24.36-1.4.36-1.4.42.8 1.65 1.5 2.95 1.5 3.88 0 6.51-3.53 6.51-8.28C19.8 6.04 16.7 3 12.65 3z"
              fill="#232F3E"
            />
          </svg>
        );

      // 4. Apple (Official bitten silhouette)
      case 'apple':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.61 1.34-.55.63-1.03 1.68-.9 2.71 1 .08 2.02-.51 2.58-1.2z"
              fill="#000000"
            />
          </svg>
        );

      // 5. Meta (Official infinity symbol)
      case 'meta':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M12 7.74c-1.92 0-3.3 1.22-4.5 2.82C6.18 8.84 4.54 7.74 2.55 7.74 0 7.74 0 10.74 0 12.7c0 3.81 2.62 6.56 5.56 6.56 2.48 0 4.14-1.5 5.25-3.35 1.1 1.85 2.76 3.35 5.24 3.35 2.94 0 5.56-2.75 5.56-6.56 0-1.96 0-4.96-2.55-4.96-1.99 0-3.63 1.1-4.95 2.82-1.2-1.6-2.58-2.82-4.5-2.82zm-6.44 9.17c-1.74 0-3.23-1.56-3.23-4.21 0-2.22 1.16-3.83 3.23-3.83 1.7 0 2.98 1.5 4.03 3.83-1.05 2.33-2.33 4.21-4.03 4.21zm12.88 0c-1.7 0-2.98-1.88-4.03-4.21 1.05-2.33 2.33-3.83 4.03-3.83 2.07 0 3.23 1.61 3.23 3.83 0 2.65-1.49 4.21-3.23 4.21z"
              fill="#0668E1"
            />
          </svg>
        );

      // 6. NVIDIA (Official green eye)
      case 'nvidia':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M8.94 7.63c.4 0 .73.33.73.74v8.34c0 .41-.33.74-.73.74H7.4a.74.74 0 0 1-.74-.74V8.37c0-.41.33-.74.74-.74h1.54zm5.02 0c.4 0 .74.33.74.74v8.34c0 .41-.34.74-.74.74h-1.53a.74.74 0 0 1-.74-.74V8.37c0-.41.33-.74.74-.74h1.53zm-9.3 1.83c.35 0 .64.29.64.64v4.68c0 .35-.29.64-.64.64H3.25a.64.64 0 0 1-.64-.64v-4.68c0-.35.29-.64.64-.64h1.41zm14.32 0c.35 0 .64.29.64.64v4.68c0 .35-.29.64-.64.64h-1.41a.64.64 0 0 1-.64-.64v-4.68c0-.35.29-.64.64-.64h1.41zM11.96 3C6.73 3 2.5 7.23 2.5 12.46c0 4.18 2.7 7.73 6.47 9.01v-2.02a7.3 7.3 0 0 1-4.47-6.99c0-4.04 3.28-7.32 7.32-7.32 3.65 0 6.67 2.68 7.23 6.2h2.02C20.5 6.64 16.63 3 11.96 3z"
              fill="#76B900"
            />
          </svg>
        );

      // 7. Adobe (Official red stylized "A")
      case 'adobe':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path d="M14.58 3H24v18l-9.42-18zm-5.16 0H0v18L9.42 3zM12 9.18L16.2 21h-3.48l-1.68-4.26H7.8L12 9.18z" fill="#FF0000" />
          </svg>
        );

      // 8. IBM (Official 8-bar blue)
      case 'ibm':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M2 4h4v1.5H2V4zm0 2.5h4V8H2V6.5zm0 2.5h4v1.5H2V9zm0 2.5h4V13H2v-1.5zm0 2.5h4V16H2v-1.5zm0 2.5h4v1.5H2V17zm0 2.5h4V21H2v-1.5zm7-16h4v1.5H9V4zm0 2.5h4V8H9V6.5zm0 2.5h4v1.5H9V9zm0 2.5h4V13H9v-1.5zm0 2.5h4V16H9v-1.5zm0 2.5h4v1.5H9V17zm0 2.5h4V21H9v-1.5zm7-16h5v1.5h-5V4zm0 2.5h5V8h-5V6.5zm0 2.5h5v1.5h-5V9zm0 2.5h5V13h-5v-1.5zm0 2.5h5V16h-5v-1.5zm0 2.5h5v1.5h-5V17zm0 2.5h5V21h-5v-1.5z"
              fill="#0F62FE"
            />
          </svg>
        );

      // 9. Oracle (Official red oval badge)
      case 'oracle':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M16.5 4H7.5C3.36 4 0 7.36 0 11.5s3.36 7.5 7.5 7.5h9c4.14 0 7.5-3.36 7.5-7.5S20.64 4 16.5 4zm-.3 11.5H7.8c-2.21 0-4-1.79-4-4s1.79-4 4-4h8.4c2.21 0 4 1.79 4 4s-1.79 4-4 4z"
              fill="#F80000"
            />
          </svg>
        );

      // 10. Salesforce (Official cloud symbol)
      case 'salesforce':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M17.48 8.65a4.74 4.74 0 0 0-3.34-1.39c-.58 0-1.15.11-1.68.32a5.53 5.53 0 0 0-4.9-2.58c-2.3 0-4.28 1.4-5.12 3.42A4.95 4.95 0 0 0 0 13.23c0 2.76 2.24 5 5 5h12.5a5.5 5.5 0 0 0 5.5-5.5c0-2.32-1.44-4.3-3.52-5.08z"
              fill="#00A1E0"
            />
          </svg>
        );

      // 11. Intel (Official modern Intel mark)
      case 'intel':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M11.66 4.67a1.67 1.67 0 1 1-3.34 0 1.67 1.67 0 0 1 3.34 0zm-1.67 3.33H8.33V20h3.33V8H9.99zM2.5 10H0v10h2.5V10zm19-2h-3.33v3.33H21.5V20H24V8h-2.5zM15 10h-2.5v10H15v-6.67c0-1.1.9-2 2-2h.5V8.03c-1.16 0-2.19.6-2.5 1.97z"
              fill="#0068B5"
            />
          </svg>
        );

      // 12. Cisco (Official vertical bridge bars)
      case 'cisco':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path d="M2.5 14h1.5v6H2.5zm3.8-3.5h1.5v9.5H6.3zm3.8-3.5h1.5v13h-1.5zm3.8 0h1.5v13h-1.5zm3.8 3.5h1.5v9.5h-1.5zm3.8 3.5H23v6h-1.5z" fill="#049FD9" />
          </svg>
        );

      // 13. Qualcomm (Official Qualcomm Q)
      case 'qualcomm':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.25 0 4.33-.74 6-2l-2.14-2.14A7.01 7.01 0 0 1 12 19c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7c0 1.54-.5 2.97-1.35 4.13l2.12 2.12C21.1 16.59 22 14.41 22 12c0-5.52-4.48-10-10-10zm2 14l5 5 1.5-1.5-5-5L14 16z"
              fill="#3253DC"
            />
          </svg>
        );

      // 14. Accenture (Official Accenture carrot symbol)
      case 'accenture':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M3 17.5l8.5-5.5L3 6.5V2l15 10L3 22v-4.5z"
              fill="#A100FF"
            />
          </svg>
        );

      // 15. TCS (Tata Consultancy Services)
      case 'tcs':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M3 4h18v3.5H13.8V20h-3.6V7.5H3V4zm11 11h2.5v5H14v-5zm4-3.5h2.5V20H18v-8.5z"
              fill="#0076CE"
            />
          </svg>
        );

      // 16. Infosys
      case 'infosys':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M2 7h3v10H2V7zm5 0h3v2.5H7V7zm0 4h3v6H7v-6zm5-4h3v1.5c.7-1.2 2-1.7 3.5-1.5V10c-1.8 0-3.5.7-3.5 3v4H12V7zm8 0h3v10h-3V7z"
              fill="#007CC3"
            />
          </svg>
        );

      // 17. Wipro
      case 'wipro':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <circle cx="12" cy="5" r="2.5" fill="#C93B2B" />
            <circle cx="18" cy="8.5" r="2.5" fill="#E87722" />
            <circle cx="19" cy="15" r="2.5" fill="#3D5A80" />
            <circle cx="14.5" cy="19.5" r="2.5" fill="#297373" />
            <circle cx="7.5" cy="18" r="2.5" fill="#6B46C1" />
            <circle cx="5" cy="11.5" r="2.5" fill="#00A86B" />
            <circle cx="8" cy="6" r="2" fill="#E2A03F" />
          </svg>
        );

      // 18. HCLTech
      case 'hcltech':
      case 'hcl':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M3 4h4v6.5h6V4h4v16h-4v-6.5H7V20H3V4zm15 3h3v13h-3V7z"
              fill="#1856C2"
            />
          </svg>
        );

      // 19. Cognizant
      case 'cognizant':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-5h2v5zm0-7h-2V7h2v2.5z"
              fill="#0033A0"
            />
            <path d="M5.5 12a6.5 6.5 0 0 1 11.2-4.5l1.4-1.4A8.5 8.5 0 1 0 12 20.5v-2a6.5 6.5 0 0 1-6.5-6.5z" fill="#0033A0" />
          </svg>
        );

      // 20. Capgemini
      case 'capgemini':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M12 2.5C9.5 6.5 4 10.5 4 15c0 3.3 2.7 6 6 6 1.3 0 2.5-.4 3.5-1.1l-1.5 2.6h4l-1.5-2.6c1 .7 2.2 1.1 3.5 1.1 3.3 0 6-2.7 6-6 0-4.5-5.5-8.5-8-12.5z"
              fill="#0070AD"
            />
          </svg>
        );

      // 21. Deloitte
      case 'deloitte':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <text x="1" y="16" fontFamily="sans-serif" fontSize="11" fontWeight="bold" fill="#000000">
              Deloitte
            </text>
            <circle cx="21" cy="14.5" r="2" fill="#86BC25" />
          </svg>
        );

      // 22. Tech Mahindra
      case 'techmahindra':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path d="M4 6h4v12H4V6zm6 0h4v12h-4V6zm6 0h4v12h-4V6z" fill="#E31837" />
            <path d="M2 4h20v2H2V4zm0 14h20v2H2v-2z" fill="#333333" />
          </svg>
        );

      // 23. LTIMindtree
      case 'ltimindtree':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path d="M3 5h4v14H3V5zm6 0h4v9h5v5H9V5zm10 0h2v7h-2V5z" fill="#002B49" />
            <path d="M15 5h6v4h-6V5z" fill="#FF5E00" />
          </svg>
        );

      // 24. EY (Ernst & Young)
      case 'ey':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path d="M12 2l10 5v10l-10 5L2 17V7l10-5z" fill="#FFE600" />
            <text x="5" y="16" fontFamily="sans-serif" fontSize="11" fontWeight="900" fill="#2E2E38">
              EY
            </text>
          </svg>
        );

      // 25. PwC (PricewaterhouseCoopers)
      case 'pwc':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <rect x="3" y="4" width="6" height="6" fill="#D04A02" />
            <rect x="10" y="4" width="6" height="6" fill="#EB8C00" />
            <rect x="3" y="11" width="6" height="6" fill="#E0301E" />
            <rect x="10" y="11" width="6" height="6" fill="#DC6900" />
            <rect x="17" y="11" width="4" height="6" fill="#E0301E" />
          </svg>
        );

      // 26. Samsung
      case 'samsung':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <ellipse cx="12" cy="12" rx="11" ry="6" fill="#1428A0" />
            <text x="3" y="14" fontFamily="sans-serif" fontSize="6.5" fontWeight="bold" fill="#FFFFFF">
              SAMSUNG
            </text>
          </svg>
        );

      // 27. Uber
      case 'uber':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <rect x="2" y="2" width="20" height="20" rx="4" fill="#000000" />
            <text x="4" y="15" fontFamily="sans-serif" fontSize="9" fontWeight="bold" fill="#FFFFFF">
              Uber
            </text>
          </svg>
        );

      // 28. Atlassian
      case 'atlassian':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path
              d="M11.6 3.1c-.3.4-.4.8-.2 1.3l4.3 9.4c.3.7 1.1 1.2 2 1.2h4.5c.6 0 1-.5 1-1 0-.3-.1-.5-.3-.7L12.7 3.4c-.3-.4-.8-.5-1.1-.3z"
              fill="#0052CC"
            />
            <path
              d="M11.4 12.3l-3.3 7.3c-.3.7-1 1.2-1.9 1.2H1.8c-.6 0-1-.5-1-1 0-.3.1-.6.3-.7l7.7-9.5c.3-.4.8-.5 1.2-.3.4.3.6.8.4 1.3v1.7z"
              fill="#2684FF"
            />
          </svg>
        );

      // 29. SAP
      case 'sap':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <path d="M2 4h20l-10 16L2 4z" fill="#008FD5" />
            <text x="5" y="11" fontFamily="sans-serif" fontSize="7" fontWeight="bold" fill="#FFFFFF">
              SAP
            </text>
          </svg>
        );

      // 30. ServiceNow
      case 'servicenow':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <circle cx="12" cy="12" r="9" stroke="#81B5A1" strokeWidth="2.5" fill="none" />
            <circle cx="12" cy="12" r="5" fill="#293E40" />
            <circle cx="12" cy="12" r="2.5" fill="#81B5A1" />
          </svg>
        );

      // 31. Flipkart
      case 'flipkart':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <rect x="2" y="4" width="20" height="16" rx="3" fill="#2874F0" />
            <path d="M14 8h-4v2h3v2h-3v4h-2V6h6v2z" fill="#FFE500" />
            <path d="M7 11h2v1H7z" fill="#FFFFFF" />
          </svg>
        );

      // 32. Paytm
      case 'paytm':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <rect x="2" y="6" width="20" height="12" rx="3" fill="#002E6E" />
            <text x="3.5" y="15" fontFamily="sans-serif" fontSize="7" fontWeight="bold" fill="#00BAF2">
              Paytm
            </text>
          </svg>
        );

      // 33. Zoho
      case 'zoho':
        return (
          <svg viewBox="0 0 24 24" className={iconSizes[size]}>
            <rect x="2" y="2" width="9" height="9" rx="1.5" fill="#E42528" />
            <rect x="13" y="2" width="9" height="9" rx="1.5" fill="#00A859" />
            <rect x="2" y="13" width="9" height="9" rx="1.5" fill="#008BD2" />
            <rect x="13" y="13" width="9" height="9" rx="1.5" fill="#F8B133" />
          </svg>
        );

      default:
        return (
          <div className="flex items-center justify-center font-bold text-white font-mono text-xs">
            {name ? name.slice(0, 2).toUpperCase() : companyId.slice(0, 2).toUpperCase()}
          </div>
        );
    }
  };

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 rounded-xl transition-transform ${sizeClasses[size]} ${
        needsLightSurface
          ? 'bg-white p-1.5 shadow-sm border border-slate-200'
          : 'bg-slate-900/80 p-1.5 border border-white/10'
      } ${className}`}
      title={name || companyId}
      aria-label={`${name || companyId} logo`}
    >
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        {renderVectorLogo()}
      </div>
    </div>
  );
};
