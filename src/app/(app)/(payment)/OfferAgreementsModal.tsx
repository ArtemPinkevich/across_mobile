import * as React from "react";
import { Text, ScrollView, Button, VStack, Link } from "native-base";
import { View } from "../../../components/Themed";
import { router } from "expo-router";

export default function OfferAgreementsModal() {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView px={4} my={4}>
				<VStack space={2}>
					<Text bold>Политика проведения платежей. Оплата банковской картой онлайн</Text>
					<Text>
						Наш сервис подключен к интернет-эквайрингу, и Вы можете оплатить заказ банковской картой Visa или Mastercard прямо на сайте. После
						подтверждения выбранного заказа откроется защищенное окно с платежной страницей платёжного сервиса{" "}
						<Link href="http://www.robokassa.kz/">Robokassa</Link>, где Вам необходимо ввести данные Вашей банковской карты и адрес электронной почты
						для квитанции или фискального чека. Мы используем протокол 3D Secure для подтверждения оплаты. Если Ваш Банк поддерживает данный протокол,
						Вы будете перенаправлены на сервер банка для дополнительной идентификации c помощью SMS кода.{" "}
						<Text bold>Информацию о правилах и методах дополнительной идентификации уточняйте в Банке, выдавшем Вам банковскую карту.</Text>
					</Text>
					<Text>
						В поля на платежной странице требуется ввести номер карты, адрес электронной почты, срок действия карты, трёхзначный код безопасности
						(CVV2 для VISA или CVC2 для MasterCard). Все необходимые данные отображены на поверхности банковской карты. CVV2/ CVC2 — это трёхзначный
						код безопасности, находящийся на оборотной стороне карты. Далее в том же окне откроется страница Вашего банка-эмитента для ввода 3-D
						Secure кода. В случае, если у вас не настроен статичный 3-D Secure, он будет отправлен на ваш номер телефона посредством SMS. Если 3-D
						Secure код к Вам не пришел, то следует обратится в ваш банк-эмитент. 3-D Secure — это самая современная технология обеспечения
						безопасности платежей по картам в сети интернет. Позволяет однозначно идентифицировать подлинность держателя карты, осуществляющего
						операцию, и максимально снизить риск мошеннических операций по карте.
					</Text>

					<Text bold>Случаи отказа в совершении платежа:</Text>
					<Text>В случае, если ваш платёж не прошёл или операция была отменена, проверьте:</Text>
					<Text>—правильно ли были введены реквизиты? Обратите внимание на срок действия вашей карты и номер;</Text>
					<Text>
						—достаточно ли средств на вашей карте? Подробнее о наличии средств на платежной карте Вы можете узнать, обратившись в банк, выпустивший
						банковскую карту;
					</Text>
					<Text>
						—открыта ли возможность проведения оплат в интернете? Подробнее о возможностях вашей карты карты Вы можете узнать, обратившись в
						банк-эмитент;
					</Text>
					<Text>
						—хватает ли вам ежедневного лимита на платежи в интернете? Подробнее о лимитах вашей карты карты Вы можете узнать, обратившись в
						банк-эмитент.{" "}
					</Text>
					<Text>
						По вопросам непрошедшей оплаты, пожалуйста обратитесь в службу поддержки банка-эмитента, выпустившего вашу банковскую карту, или в службу
						поддержки сайта, на котором была произведена оплата.{" "}
					</Text>

					<Text bold>Гарантии безопасности</Text>
					<Text>
						Платёжный сервис <Link href="http://www.robokassa.kz/">Robokassa</Link> защищает и обрабатывает данные Вашей банковской карты по стандарту
						безопасности PCI DSS. Передача информации в платежный шлюз происходит с применением технологии шифрования SSL. Дальнейшая передача
						информации происходит по закрытым банковским сетям, имеющим наивысший уровень надежности.{" "}
						<Link href="http://www.robokassa.kz/">Robokassa</Link> не передает данные Вашей карты интернет магазину или третьим лицам. Для
						дополнительной аутентификации держателя карты используется протокол 3D Secure. В случае, если у Вас есть вопросы по совершенному платежу,
						Вы можете обратиться в службу поддержки клиентов по электронной почте.
					</Text>

					<Text bold>Безопасность онлайн платежей</Text>
					<Text>
						Предоставляемая Вами персональная информация (e-mail, номер банковской карты) является конфиденциальной и не подлежит разглашению. Данные
						Вашей банковской карты передаются только в зашифрованном виде и не сохраняются на нашем сервере. Безопасность обработки Интернет-платежей
						гарантирует платёжный сервис <Link href="http://www.robokassa.kz/">Robokassa</Link>. Все операции с платежными картами происходят в
						соответствии с требованиями VISA International, MasterCard Worldwide и других платежных систем. При передаче информации используется
						специальные технологии безопасности карточных онлайн-платежей, обработка данных ведется на безопасном высокотехнологичном сервере
						платёжного сервиса.
					</Text>
					<Text bold>Оплата платежными картами безопасна, потому что:</Text>
					<Text>
						• Система авторизации гарантирует покупателю, что платежные реквизиты его платежной карты (номер, срок действия, CVV2/CVC2) не попадут в
						руки мошенников, так как эти данные не хранятся на сервере в зашифрованном виде и не могут быть похищены.
					</Text>
					<Text>
						• Покупатель вводит свои платежные данные непосредственно в системе авторизации <Link href="http://www.robokassa.kz/">Robokassa</Link>, а
						не на сайте интернет-магазина, следовательно, платежные реквизиты карточки покупателя не будут доступны третьим лицам.
					</Text>

					<Text fontSize={"lg"} mt={4} textAlign={"center"} bold>
						Договор публичной оферты
					</Text>
					<Text>
						(Публичная оферта – это содержащее все существенные условия договора предложение, из которого усматривается воля лица, делающего
						предложение заключить договор на указанных в публичной оферте условиях с любым лицом, которое отзовется на это предложение в соответствии
						с п. 5 ст. 395 Гражданского кодекса Республики Казахстан)
					</Text>
					<Text>
						Текст Договора является предложением (публичной офертой) на использование приложения Compass (далее – Сервис), доступ к которому
						предоставляет возможность получения услуг и пользования информационными ресурсами Администратора Сервиса «TOO «COMPASS GROUP LTD» (Юр.
						Лица или ИП) (далее – Администратор).
					</Text>
					<Text>
						Оплата услуг представленных в мобильном приложении Администратора физическим/юридическим лицом (далее – Пользователь) являться акцептом
						данной публичной оферты, что равносильно заключению договора (далее – Договор) на условиях, изложенных в нем.
					</Text>
					<Text>
						В случае, если Пользователь не согласен с текстом представленного Договора, Администратор предлагает отказаться от использования
						предоставляемых услуг.
					</Text>
					<Text>1. Основные положения</Text>
					<Text>
						1.2. Пользователь и Администратор заключили настоящий договор (далее – Договор) на получение услуг представленных Администратором, в
						соответствии с действующим законодательством Республики Казахстан.
					</Text>
					<Text>1.3. Термины, используемые в тексте Договора:</Text>
					<Text>· «Оферта» - публичное предложение на использование онлайн сервиса;</Text>
					<Text>· «Акцепт» - безоговорочное принятие Пользователем условий договора в полном объеме;</Text>
					<Text>· «Администратор» - сервис-провайдер, являющийся собственником Сервиса;</Text>
					<Text>
						· «Пользователь» - любое физическое/юридическое лицо которое принимает условия договора и пользуется услугами представленными Сервисом
						Администратора;
					</Text>
					<Text>· «Услуги» - «Подписка»;</Text>
					<Text>
						· «Сервис» - совокупность программных средств, обеспечивающих публикацию для всеобщего обозрения информации и данных, объединенных общим
						целевым назначением, посредством технических средств. Сервис доступен Пользователям по уникальному электронному адресу или его буквенному
						обозначению. Под Сервисом в Соглашении понимается программный продукт, расположенный в сети Интернет по адресу «https://compass-group.kz»
					</Text>
					<Text>2. Предмет оферты</Text>
					<Text>2.1. Администратор предоставляет услуги по «Оплата за подписку» в мобильном приложении.</Text>
					<Text>2.2. Администратор обязуется оказывать техническое обслуживание и поддержку Сервиса.</Text>
					<Text>2.3. Действующая редакция Договора находится в мобильном приложении в разделе Профиль-Подписка.</Text>

					<Text>3. Использование онлайн сервиса</Text>
					<Text>
						3.1. Для получения услуги Администратора Пользователь по своему желанию выбирает тарифный план, проводит регистрацию путем предоставления
						персональных данных и производит оплату.
					</Text>
					<Text>
						3.2. Оплата Пользователя означает безоговорочное и полное согласие с условиями Договора. День оплаты Пользователем Услуг считается днем
						заключения Договора на срок указанный в пакете услуг.
					</Text>
					<Text>4. Регистрация в Сервисе, конфиденциальность и защита персональных данных</Text>
					<Text>4.1. Персональные данные содержат в себе следующую информацию:</Text>
					<Text>· Фамилия, имя, отчество Пользователя;</Text>
					<Text>· Адрес электронной почты (E-mail);</Text>
					<Text>· Пароль и логин для входа в личный кабинет;</Text>
					<Text>· Статус Пользователя (физическое/юридическое лицо);</Text>
					<Text>· Адрес проживания;</Text>
					<Text>· ИИН/БИН</Text>
					<Text>4.2. При необходимости Пользователь имеет право редактировать внесенные данные о себе в личном кабинете.</Text>
					<Text>
						4.3. Администратор обязуется не разглашать полученную от Пользователя информацию. Не считается нарушением обязательств разглашение
						информации в соответствии с обоснованными требованиями, согласно действующему законодательству Республики Казахстан.
					</Text>
					<Text>
						4.4. Пользователь несет ответственность за все действия и последствия использования личного кабинета, за добровольную передачу доступа к
						своему личному кабинету третьим лицам, а также за несанкционированный доступ. Все перечисленные действия будут считаться произведенными
						самим Пользователем.
					</Text>
					<Text>5. Права и обязанности сторон</Text>
					<Text>5.1. Администратор:</Text>
					<Text>· Обязуется оказывать техническую поддержку и предоставлять полную информацию в рамках пакетных Услуг.</Text>
					<Text>· Обязуется не разглашать персональные данные Пользователя;</Text>
					<Text>· Не несет ответственность в связи с информацией, предоставленной Пользователем.</Text>
					<Text>· Имеет право в одностороннем порядке изменять условия предоставления Услуг и вносит изменения в редакцию Договора.</Text>
					<Text>5.2. Пользователь:</Text>
					<Text>
						· Несет полную ответственность за правильность информации, введенной при регистрации в Сервисе Администратора, а также за несвоевременное
						представление изменений в регистрационные данные;
					</Text>
					<Text>
						· Несет личную ответственность за любые действия, совершенные с использованием своего личного кабинета, а также за любые последствия,
						которые могло повлечь или повлекло такое использование третьими лицами при ненадлежащем хранении Пользователем логина и пароля.
					</Text>
					<Text>· Имеет право пользоваться Сервисом в своих интересах, непосредственно не вмешиваясь в его работу.</Text>
					<Text>6. Порядок оплаты</Text>
					<Text>
						6.1. Оплата производится на счет Администратора банковскими картами или иными безналичными способами после проведения регистрации по
						следующим тарифным планам (пакетам Услуг):
					</Text>
					<Text>6.2. Услуги предоставляются при условии 100% предоплаты, тестовые периоды не предоставляются.</Text>
					<Text>6.3. Администратор самостоятельно контролирует срок истечения предоставления Услуг.</Text>
					<Text>6.4. За правильность платежей ответственность лежит на Пользователе.</Text>
					<Text>7. Ответственность сторон, разрешение споров</Text>
					<Text>
						7.1. За неисполнение или ненадлежащее исполнение своих обязательств Стороны несут ответственность в соответствии с действующим
						законодательством Республики Казахстан.
					</Text>
					<Text>
						7.2. Все споры, возникающие между Сторонами при исполнении настоящей Оферты, разрешаются путем мирных переговоров, а в случае не
						достижения согласия между Сторонами, спор рассматривается в судебном порядке в соответствии с действующим законодательством Республики
						Казахстан в арбитражном суде по месту регистрации Администратора.
					</Text>
					<Text>8. Срок действия договора и его расторжение</Text>
					<Text>
						8.1. Публичная оферта вступает в силу с момента акцепта Оферты и действует в течение срока предоставления доступа к Сайту Администратора.
					</Text>
					<Text>8.2. Администратор имеет право блокировать доступ к серверу в следующих случаях:</Text>
					<Text>· При получении распоряжений государственных органов Республики Казахстан;</Text>
					<Text>· При нарушении авторских и смежных прав;</Text>
					<Text>· При мотивированном обращении третьих лиц при нарушении их прав;</Text>
					<Text>· При обнаружении запрещенной законодательством информации, размещенной Пользователем.</Text>
					<Text>
						8.3. Пользователь имеет право отказаться от пользования предоставленными Услугами. Отказ от Услуг принимается в течение 14 (четырнадцати)
						календарных дней с даты получения доступа в Сервис путем направления письменного заявления от Пользователя на e-mail Администратора с
						объяснением реальных мотивированных причин отказа. В случае нарушения срока в течение, которого возможен отказ, претензии от Пользователя
						не принимаются.
					</Text>
					<Text>
						8.4. Возврат денежных средств производится Администратором за минусом денежной суммы за фактически оказанные Услуги в течение 14
						(четырнадцати) календарных дней на реквизиты Пользователя, указанные в заявлении после подтверждения Администратором мотивированных причин
						отказа от Услуг.
					</Text>
					<Text>8.5. В случае нарушений условий Договора предоплаченные денежные средства не возвращаются.</Text>
					<Text>9. Прочие условия</Text>
					<Text>
						9.1. Администратор имеет право в одностороннем порядке изменить условия Договора в целом или в его части без согласования с Пользователем.
						В общем доступе публикуется действующая редакция.
					</Text>
					<Text>9.2. Данная версия настоящего Договора является текущей и отменяет предыдущую версию.</Text>
					<Text>
						9.3. Стороны освобождаются от ответственности за неисполнение или ненадлежащее исполнение условий настоящего Договора на время действий
						непреодолимой силы. К ним относятся такие события как: стихийные природные явления, военные действия, массовые беспорядки, а также
						принятие государственными органами законодательных актов, препятствующих выполнению условий настоящего Договора. В этом случае выполнение
						обязательств двумя Сторонами откладывается на время действия обстоятельств непреодолимой силы и их последствий.
					</Text>
					<Text>
						9.4. Во всем остальном, что не предусмотрено условиями настоящего Договора, Стороны руководствуются действующим законодательством
						Республики Казахстан.
					</Text>

					<Button variant="blue_button" onPress={() => router.back()}>
						Назад
					</Button>
				</VStack>
			</ScrollView>
		</View>
	);
}
