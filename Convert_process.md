# .json 파일의 양식  

최종적으로 출력할 .json 파일의 형태는  

```json
[{
	"name": "파라메트릭",
	"preamp": 0.0,
	"parametric": true,
	"bands": [
		{
			"type": 0,
			"channels": 0,
			"frequency": 90,
			"q": 0.800000011920929,
			"gain": 0.0,
			"color": 0
		},
		{
			"type": 1,
			"channels": 0,
			"frequency": 10000,
			"q": 0.6000000238418579,
			"gain": 0.0,
			"color": 0
		}
	]
}
]
```  

과 같다.  
"name" 안에는 파일의 이름이, "preamp" 에는 preamp 값이, "parametric" 값은 항상 true로, 그리고 "bands" 안의 list에 있는 저 두개의 필터는 기본값으로 있고 그 뒤로 새로 필터를 추가하는 방식이다.

# 입력값의 형식  

입력값은 다음과 같은 형태로 주어진다.

```txt
Preamp: -4.9 dB
Filter 1: ON PK Fc 21 Hz Gain -4.3 dB Q 0.700
Filter 2: ON PK Fc 170 Hz Gain -3.3 dB Q 0.600
Filter 3: ON PK Fc 750 Hz Gain 1.0 dB Q 1.400
Filter 4: ON PK Fc 1500 Hz Gain -1.4 dB Q 1.200
Filter 5: ON PK Fc 3400 Hz Gain 4.8 dB Q 1.600
Filter 6: ON PK Fc 6400 Hz Gain 4.9 dB Q 2.000
Filter 7: ON PK Fc 8100 Hz Gain -5.4 dB Q 2.000
Filter 8: ON PK Fc 100 Hz Gain 0.5 dB Q 0.500
Filter 9: ON PK Fc 600 Hz Gain -0.5 dB Q 0.800
+

Filter 10: ON PK Fc 150 Hz Gain 2 dB Q 1
```

나

```txt
Filter: ON LSC Fc 40 Hz Gain 3 dB Q 0.71
Filter: ON LSC Fc 80 Hz Gain 3 dB Q 0.71
#
Filter 1: ON PK Fc 20 Hz Gain 3.2 dB Q 0.500
Filter 2: ON PK Fc 100 Hz Gain 0.6 dB Q 1.100
Filter 3: ON PK Fc 110 Hz Gain 0.7 dB Q 2.000
Filter 4: ON PK Fc 130 Hz Gain -1.0 dB Q 2.000
Filter 5: ON PK Fc 240 Hz Gain -1.2 dB Q 0.800
Filter 6: ON PK Fc 2200 Hz Gain 2.0 dB Q 1.600
Filter 7: ON PK Fc 4400 Hz Gain 0.9 dB Q 1.100
Filter 8: ON PK Fc 4700 Hz Gain -0.7 dB Q 1.700
Filter 9: ON PK Fc 5700 Hz Gain 0.5 dB Q 2.000
Filter 10: ON PK Fc 5900 Hz Gain -2.2 dB Q 1.000
Filter 11: ON PK Fc 7500 Hz Gain 2.3 dB Q 1.000
Filter 12: ON PK Fc 7700 Hz Gain 2.7 dB Q 1.900
Filter 13: ON PK Fc 9000 Hz Gain -2.7 dB Q 2.000
#
Filter: ON PK Fc 3200 Hz Gain 4 dB Q 2
Filter: ON PK Fc 12000 Hz Gain 5 dB Q 3
```  

이런식으로, 입력값은 여러줄로 들어오며, 다음과 같이 `Filter:` 혹은 `Filter 숫자:` 이런식으로 필터 줄을 먼저 명시한 다음, 뒤에 값이 오는 방식이다.  

# 변환규칙  

1. 시작이 `Preamp` 나 `Filter:` 나 `Filter 숫자:` 가 아닌 줄은 무시한다.  
    - 시작이 `Preamp` 인 경우 "preamp" 에 값을 채워넣는다
    - 시작이 `Filter:` 나 `Filter 숫자:` 인 경우 2번부터 12번까지의 방법을 따른다.
2. 그 뒤에는 스페이스를 기준으로 각각의 항목을 나눠서 본다.
3. 첫번째 항목은 ON이라 적혀있으면 필터에 넣고, 아니면 다음 필터 내용으로 넘어간다.  
4. 두번째 항목은 몇가지 경우의 수가 있다.

    - LSC라 적혀있으면 "type" 에 4를 넣는다  
    - HSC라 적혀있으면 "type" 에 5를 넣는다
    - PK라 적혀있으면 "type" 에 3을 넣는다
    - BP라 적혀있으면 "type" 에 2를 넣는다
    - HP라 적혀있으면 "type" 에 1을 넣는다
    - LP라 적혀있으면 "type" 에 0을 넣는다

5. 세번째 항목은 Fc로, 다음에 올 값이 frequency라는걸 나타낸다

6. 네번째 항목은 "frequency" 안에 값을 넣으면 된다

7. 다섯번째 항목은 Hz 로, 네번째 항목의 값의 단위를 나타낸다.

8. 여섯번째 항목은 Gain 으로, 다음에 올 값을 "gain" 에 넣으면 된다는것을 알려준다.

9. 일곱번째 항목은 "gain" 에 값으로 넣으면 된다

10. 여덟번째 항목은 dB 로 Gain 의 단위가 dB인것을 보여준다

11. 아홉번째 항목은 Q 로 다음에 올 값을 "q" 에 넣으면 된다는것을 보여준다

12. 열번째 항목은 "q" 에 값으로 넣으면 된다
