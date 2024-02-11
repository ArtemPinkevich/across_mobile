# across-mobile

Mobile app for cargo carriers and shippers

gluestack-ui пришлось заменить на native-base из-за невозможности собрать aab и apk

Чтобы автоматизировать авторизацию, нужно захардкодить profilePhoneNumber в sign-in.tsx.
Чтобы игнорировать авторизацию, нужно закомментить блок "if (!session... " в /(app)/\_layout.tsx
