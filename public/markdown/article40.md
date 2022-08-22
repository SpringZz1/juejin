## ����

������Ҫ���ܣ�

* Go ��׼�� [testing](https://pkg.go.dev/testing@go1.18) �� �� go test [����](https://pkg.go.dev/cmd/go@go1.18)��
* Go �ٷ�ά���� [Mock](https://github.com/golang/mock) �⡣
* Go �����������Ĳ��Կ� [Testify](https://github.com/stretchr/testify#mock-package)��

����ʹ�õ� Go �汾Ϊ 1.18��ʾ������λ�� [rectcircle/go-test-demo](https://github.com/rectcircle/go-test-demo)��

## Go ��׼�� testing �� �� `go test` ����

Go ͨ����׼��� testing ���� Go �����й��� test �����������Բ��棬�ṩ��һ����ȫ��Ĳ��Ի��ơ�

��С����Ҫ�������ʹ�� testing ����д�������͵Ĳ��Ժ�����

### �������

һ�����⺯��λ�� `01-testing/01-testfunc.go` �ļ���

```go
package testingdemo

func IntAbs(a int) int {
	if a < 0 {
		return -a
	}
	return a
}
```

���Ժ���λ�� `01-testing/01-testfunc_test.go` �ļ���

```go
package testingdemo

import "testing"

func TestIntAbs(t *testing.T) {
	got := IntAbs(-1)
	if got != 1 {
		t.Errorf("Abs(-1) = %d; want 1", got)
	}
	got = IntAbs(1)
	if got != 1 {
		t.Errorf("Abs(1) = %d; want 1", got)
	}
}
```

���Ժ�����д�Ļ���Ҫ��Ϊ��

* ����Դ����ļ����� `_test.go` ��β��
* ���Ժ����ĺ������� `Test` ��ͷ��
* ����ǩ��Ϊ `func (t *testing.T)`��

ͨ�� `go test -run ^TestIntAbs$ ./01-testing` ����������в��Ժ�����

[`*testing.T` ����](https://pkg.go.dev/testing@go1.18#T)

* ���÷������£�
    * `func (c *T) Fail()` �����Ժ������Ϊʧ�ܣ����Լ���ִ�С�
    * `func (c *T) FailNow()` �����Ժ������Ϊʧ�ܣ������� `runtime.Goexit`����ֹ��Э�̡�
    * `func (c *T) Log(args ...any)` ��ӡ��־�������� Println���������в������ `-v` ��־�����߲���ʧ��ʱ���Ŵ�ӡ��־��
    * `func (c *T) Logf(format string, args ...any)` ��ӡ��־�������� `Printf`���������в������ `-v` ��־�����߲���ʧ��ʱ���Ŵ�ӡ��־��
    * `func (c *T) Error(args ...any)` �ȼ��ڵ��� `Log` ��� `Fail`��
    * `func (c *T) Errorf(format string, args ...any)` �ȼ��� `Logf` ��� `Fail`��
    * `func (c *T) Fatal(args ...any)` �ȼ��ڵ��� `Log` ��� `FailNow`��
    * `func (c *T) Fatalf(format string, args ...any)` �ȼ��� `Logf` ��� `FailNow`��
    * `func (c *T) SkipNow()` �����Ա��Ϊ�ѱ���������ͨ������ `runtime.Goexit` ִֹͣ�С��������ʧ�ܣ��μ� `Error`, `Errorf`, `Fail`��Ȼ������������Ȼ����Ϊ��ʧ�ܵġ�������� `FailNow`�� `SkipNow` ��������в��Ե� goroutine ���ã������ǴӲ����ڼ䴴�������� goroutine ���á����� `SkipNow` ����ֹͣ���� goroutine��
    * `func (c *T) Skip(args ...any)` �ȼ��� `Log` ��� `SkipNow`��
    * `func (c *T) Skipf(format string, args ...any)` �ȼ��� `Logf` ��� `SkipNow`��

    * `func (c *T) Cleanup(f func())` ע��������������˳��Ϊ������ӣ��ȵ��á�
    * `func (t *T) Parallel()` ��ʾ�ò��Խ��루���ҽ��룩�������в��Բ������С�����ʹ�� `-count` �� `-cpu` ������в���ʱ���������ԵĶ��ʵ����Զ����˴˲������У�
    * `func (t *T) Run(name string, f func(t*T)) bool` ���� t ���Ӳ��ԣ���Ϊ name �����Ժ��� f �����ڵ����� goroutine ������ f ��������ֱ�� f ���ػ���� `t.Parallel`�� Run ���� f �Ƿ�ɹ������������ڵ��� `t.Parallel` ֮ǰû��ʧ�ܣ������ԴӶ�� goroutine ͬʱ���� Run�������д�����ö��������ⲿ���Ժ��� t ����֮ǰ���ء�
* �����������£�
    * `func (c *T) Name() string` ���ص�ǰ����/�Ӳ��Ժ��������ƣ��������ͬ���ģ����Զ����һ����׺��
    * `func (c *T) Skipped() bool` �Ƿ�������
    * `func (c *T) TempDir() string` ����һ����ʱĿ¼������ʹ�á������Լ��������Ӳ������ʱ��`Cleanup` ���Զ�ɾ����Ŀ¼���� `t.TempDir` ��ÿ�κ������ö��᷵��һ��Ψһ��Ŀ¼�����Ŀ¼����ʧ�ܣ�TempDir ͨ������ `Fatal` ��ֹ���ԡ�
    * `func (c *T) Helper()` ��Ǹú���Ϊ�����������ڲ���ʧ�ܻ��ӡ��־ʱ���������ӡ�ú����ĵ���ջ����־��
    * `func (t *T) Deadline() (deadline time.Time, ok bool)` �������в���ʱ `-timeout` ���õ�ʱ�䣬Ĭ��Ϊ 0 (������ʱ)��
    * `func (t *T) Setenv(key, value string)` ���� `os.Setenv(key, value)` ��ʹ�� `Cleanup` �����������ָ������Ժ��ԭʼֵ���ⲻ�����ڲ��в��ԣ���

### ��׼����

��������ϣ������һ�����������ܣ���ʱ����ͨ�� Go �ṩ�Ļ�׼������ʵ�֣�����ԭ��Ϊ�����ѭ�����ô��⺯��������ƽ����ʱ��ָ�꣩��

`01-testing/02-benchmark_test.go`

```go
package testingdemo

import (
	"bytes"
	"html/template"
	"math/rand"
	"testing"
)

func BenchmarkRandInt(b *testing.B) {
	for i := 0; i < b.N; i++ {
		rand.Int()
	}
}

func BenchmarkTemplateParallel(b *testing.B) {
	templ := template.Must(template.New("test").Parse("Hello, {{.}}!"))
	b.RunParallel(func(pb *testing.PB) {
		var buf bytes.Buffer
		for pb.Next() {
			buf.Reset()
			templ.Execute(&buf, "World")
		}
	})
}
```

��׼���Ա�д�Ļ���Ҫ��Ϊ��

* Դ����ļ����� `_test.go` ��β��
* �������� `Benchmark` ��ͷ��
* ����ǩ��Ϊ `func (b *testing.B)`��

ͨ�� `go test -run=^$ -benchmem -bench ^BenchmarkRandInt$ ./01-testing` �� `go test -run=^$ -benchmem -bench ^BenchmarkTemplateParallel$ ./01-testing` ���������������������׼���Ժ�����

�ͳ�����Բ�ͬ����׼���Ե���־���ǻᱻ��ӡ����

��һ����׼���ԣ�������£������豸��Ϣ����

```
BenchmarkRandInt-8      77098495                15.57 ns/op            0 B/op          0 allocs/op
```

����������£�

* BenchmarkRandInt-8 `������-GOMAXPROCS`��
* 77098495 ��ʾһ��ִ���� 77098495 �Σ��� `b.N` ��ֵ��
* 15.57 ns/op ��ʾƽ��������for ѭ��ÿ�λ����� 15.57 ns��
* 0 B/op ��ʾƽ��������for ѭ��ÿ�������� 0 Byte �ڴ� �������� `-benchmem` ��־����
* 0 allocs/op ��ʾƽ��������for ѭ��ÿ�������� 0 ���ڴ棨������ `-benchmem` ��־����

[`*testing.B` ����](https://pkg.go.dev/testing@go1.18#B)

* �������ֶΣ�
    * `N int` �����������ͳ�����Բ�ͬ����׼���Իᱻ���ö�Σ�ÿ�ε��ã���Ҫ�����Ĵ�����¼�� `N` �У�`N` �� 1 ��ʼ�������׼���Ժ����� 1 ��(Ĭ��ֵ)�ھ���ɣ��� `N` ���ӣ����ٴ����л�׼���Ժ�����
* �������£�
    * ���� [`*testing.T` ����](https://pkg.go.dev/testing@go1.18#T) `func (c *T) Xxx` ��ط������� `FailNow`, `Fatal`, `Fatalf`��`Error` �ȡ�
    * `func (b *B) ReportAllocs()` Ϊ�˻�׼���� malloc ͳ����Ϣ���ȼ������� `-benchmem`��ֻ�Ե�ǰ��׼������Ч��
    * `func (b *B) ReportMetric(n float64, unit string)` �����Զ���ָ�꣬�μ���[ʾ��](https://pkg.go.dev/testing@go1.18#example-B.ReportMetric)��
    * `func (b *B) StartTimer()` StartTimer ��ʼ��ʱ���ԡ��˺����ڻ�׼���Կ�ʼǰ�Զ����ã���Ҳ�������ڵ��� StopTimer ��ָ���ʱ��
    * `func (b *B) StopTimer()` StopTimer ֹͣ��ʱ���ԡ����������ִ������������ĸ��ӳ�ʼ��ʱ��ͣ��ʱ����
    * `func (b *B) ResetTimer()` ResetTimer �������Ļ�׼����ʱ����ڴ������������㲢ɾ���û������ָ�ꡣ����Ӱ���ʱ���Ƿ��������С�
    * `func (b *B) Run(name string, f func(b *B)) bool` ����һ���ӻ�׼��ע�⣬`b.Run` ���� `b.N` Ϊ 1 ʱ�Żᱻ�����������ã����� `Run` ��������ĺ�ʱ���ᱻͳ�ơ�
    * `func (b *B) RunParallel(body func(*PB))` �������л�׼���ԡ���������� goroutine ��������֮����� b.N �ε����� goroutine ������Ĭ��Ϊ GOMAXPROCS��Ҫ���ӷ� CPU �󶨻�׼�Ĳ��жȣ����� RunParallel ֮ǰ���� SetParallelism�� RunParallel ͨ���� go test -cpu ��־һ��ʹ�á�body �������ڶ����� goroutine �����С���Ӧ�������κ� goroutine-local ״̬��Ȼ�����ֱ�� pb.Next ���� false������Ӧʹ�� StartTimer��StopTimer �� ResetTimer ��������Ϊ���Ǿ���ȫ��Ч������Ҳ��Ӧ�õ��� Run���μ���[ʾ��](https://pkg.go.dev/testing@go1.18#example-B.RunParallel)��
    * `func (b *B) SetBytes(n int64)` SetBytes ��¼���������д�����ֽ������������������׼������ ns/op �� MB/s��
    * `func (b *B) SetParallelism(p int)` SetParallelism �� RunParallel ʹ�õ� goroutine ����������Ϊ p*GOMAXPROCS�������� CPU ���ƵĻ�׼���ԣ�ͨ������Ҫ���� SetParallelism����� p С�� 1����˵��ý���Ч��

### Example

����һ���������������º��� `01-testing/03-example.go`��

```go
package testingdemo

import "fmt"

func Hello() {
	fmt.Println("hello")
}

func Salutations() {
	fmt.Println("hello, and")
	fmt.Println("goodbye")
}

type T struct{}

func (t *T) M() {
	fmt.Println("t.m()")
}
```

ϣ������Щ���ͱ�дһЩʾ�����룬��Щʾ��������ӡһЩ���ݣ���У����Щ�ı����Ƿ����Ԥ�ڡ�

`01-testing/03-example_test.go`

```go
package testingdemo

import "fmt"

func Example() {
	fmt.Println("This is a package example")
	// Output: This is a package example
}

func Example_a01() {
	fmt.Println("This is a package example")
	// Output: This is a package example
}

func ExampleHello() {
	Hello()
	// Output: hello
}

func ExampleHello_a01() {
	Hello()
	// Output: hello
}

func ExampleSalutations() {
	Salutations()
	// Output:
	// hello, and
	// goodbye
}

func ExampleT_M() {
	t := T{}
	t.M()
	// Output: t.m()
}

func ExampleT_M_a01() {
	t := T{}
	t.M()
	// Output: t.m()
}
```

Example ��д�Ļ���Ҫ��Ϊ��

* Դ����ļ����� `_test.go` ��β��
* �������� `Example` ��ͷ��
    * �� Example Ϊ�� `Example`��
    * ����� Example Ϊ�� `Example_suffix`��
    * ����/���� Example Ϊ�� `ExampleT`��`ExampleF`��
    * ����/���Ͷ�� Example Ϊ�� `ExampleT_suffix`��`ExampleF_suffix`��
    * ���� Example Ϊ�� `ExampleT_M`��
    * ������� Example Ϊ�� `ExampleT_M_suffix`��
* ����ǩ��Ϊ `func ()`��
* �� Example ���������У�飬�ں����������������ע�ͣ�
    * һ�����

        ```go
        func ExampleHello() {
            fmt.Println("hello")
            // Output: hello
        }

        func ExampleSalutations() {
            fmt.Println("hello, and")
            fmt.Println("goodbye")
            // Output:
            // hello, and
            // goodbye
        }
        ```

    * �������

        ```go
        func ExamplePerm() {
            for _, value := range Perm(5) {
                fmt.Println(value)
            }
            // Unordered output: 4
            // 2
            // 1
            // 3
            // 0
        }
        ```

ͨ�������� `go test -run ^Example$ ./01-testing` ������������� Exmaple��

ע�⣺Example �������˿����� `go test` ���в����⣬������ͨ�� `go doc` �������ɵ� go doc �ĵ��С�

### Fuzzing ����

> ����μ���[Go 1.18 ������ - Fuzzing ��Ԫ����](/posts/go-1-18-features#fuzzing-��Ԫ����)��

������һ�����⺯�����ַ�����ת��λ�� `01-testing/04-fuzzing.go`��

```go
package testingdemo

import (
	"errors"
	"unicode/utf8"
)

func Reverse(s string) (string, error) {
	if !utf8.ValidString(s) {
		return s, errors.New("input is not valid UTF-8")
	}
	r := []rune(s)
	for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r), nil
}
```

ͨ�� Go 1.18 �ṩ�� Fuzzing ���ԣ����Խ������������ԣ�λ�� `01-testing/04-fuzzing_test.go`��

```go
package testingdemo

import (
	"testing"
	"unicode/utf8"
)

func FuzzReverse(f *testing.F) {
	// 1. �ṩĬ������µĲ�������
	// 2. ��������������������
	testcases := []string{"Hello, world", " ", "!12345"}
	for _, tc := range testcases {
		f.Add(tc) // Use f.Add to provide a seed corpus
	}
	f.Fuzz(func(t *testing.T, orig string) { // 2~n ��������Ҫ������ f.Add ����һ��
		rev, err1 := Reverse(orig)
		if err1 != nil {
			return
		}
		doubleRev, err2 := Reverse(rev)
		if err2 != nil {
			return
		}
		if orig != doubleRev {
			t.Errorf("Before: %q, after: %q", orig, doubleRev)
		}
		if utf8.ValidString(orig) && !utf8.ValidString(rev) {
			t.Errorf("Reverse produced invalid UTF-8 string %q", rev)
		}
	})
}
```

Fuzz ���Ա�д�Ļ���Ҫ��Ϊ��

* Դ����ļ����� `_test.go` ��β��
* �������� `Fuzz` ��ͷ��
* ����ǩ��Ϊ `func (f *testing.F)`��

ͨ�� `go test -fuzz=^FuzzReverse$ -fuzztime 2s -run ^$ ./01-testing`  �������иò��ԣ�ʧ�ܵ� case ��д�� `testdata/fuzz` Ŀ¼�С�

[`*testing.F` ����](https://pkg.go.dev/testing@go1.18#F) �����ķ�����

* ���� [`*testing.T` ����](https://pkg.go.dev/testing@go1.18#T) `func (c *T) Xxx` ��ط������� `FailNow`, `Fatal`, `Fatalf`��`Error` �ȡ�
* `func (f *F) Add(args ...any)` ��������ӵ��������Ͽ��Խ���ģ�����ԡ������ fuzz Ŀ��֮����ڲ����ã��⽫��һ���ղ��������� args ������ fuzz Ŀ��Ĳ���ƥ�䡣Go �����Զ��Ķ�ȡ  `testdata/fuzz` Ŀ¼�е��������Ͽ⡣
* `func (f *F) Fuzz(ff any)` Fuzz ���� fuzz ���� ff ����ģ�����ԡ���� ff ����һ�����ʧ�ܣ���Щ����������ӵ��������Ͽ��С�
    * ff ������һ��û�з���ֵ�ĺ��������һ�������� `*T`�����������Ҫģ�����Ե����ͣ����磺`f.Fuzz(func(t*testing.T, b []byte, i int) { ... })`������ʹ���������ͣ�`[]byte`��`string`��`bool`��`byte`��`rune`��`float32`��`float64`��`int`��`int8`��`int16`��`int32`��`int64`��`uint`��`uint8`��`uint16`��`uint32`��`uint64`��δ�����ܻ�֧�ָ������͡�
    * ff ���õ����κ� `*F` ���������� `(*F).Log`, `(*F).Error`, `(*F).Skip`���������Ӧ�� `*T` ������ `(*F).Fuzz` ������Ψһ����� `*F` ������ `(*F).Failed` �� `(*F).Name`��
    * ff ����Ӧ���ǿ��ٺ�ȷ���ģ�����������Ϊ��Ӧ�������ڹ���״̬����ģ��������ִ��֮�䲻Ӧ�����ɱ�����������ָ�����ǵ�ָ�룬��Ϊ֧�����ǵ��ڴ���ܻ��ں��������ڼ䷢���仯�� ff �����޸�ģ�������ṩ�Ĳ����Ļ������ݡ�
    * ����ģ������ʱ��F.Fuzz ֱ���������⡢ʱ�����꣨ʹ�� -fuzztime ���ã�����Թ��̱��ź��жϲŷ��ء� F.Fuzz Ӧ��ֻ����һ�Σ��������ȵ����� F.Skip �� F.Fail��

### Skipping ����

ͨ������ `*T` �� `*B` �� `Skip` ����������������ʱ�������Ի��׼���ԣ�

```go
func TestTimeConsuming(t *testing.T) {
    if testing.Short() {
        t.Skip("skipping test in short mode.")
    }
    ...
}
```

���������Ч��`*T` �� Skip ����������ģ��Ŀ�꣬����Ӧ������Ϊʧ�����롣���磺

```go
func FuzzJSONMarshalling(f *testing.F) {
    f.Fuzz(func(t *testing.T, b []byte) {
        var v interface{}
        if err := json.Unmarshal(b, &v); err != nil {
            t.Skip()
        }
        if _, err := json.Marshal(v); err != nil {
            t.Error("Marshal: %v", err)
        }
    })
}
```

### �Ӳ��Ժ��ӻ�׼

����ͨ�� `Run` ������Ϊ������Ժͻ�׼���ԣ����һ���Ӳ��Ժ��ӻ�׼���ԣ�ʾ���μ� `01-testing/06-subtest_test.go` �ļ���

```go
package testingdemo

import (
	"fmt"
	"testing"
	"time"
)

func TestFoo(t *testing.T) {
	// <setup code>
	t.Run("A=1", func(t *testing.T) {})
	t.Run("A=2", func(t *testing.T) {})
	t.Run("B=1", func(t *testing.T) {})
	// <tear-down code>
}

func TestGroupedParallel(t *testing.T) {
	tests := []struct {
		Name string
	}{
		{
			Name: "A=3",
		},
	}
	for _, tc := range tests {
		tc := tc // capture range variable
		t.Run(tc.Name, func(t *testing.T) {
			t.Parallel()
		})
	}
}

func TestTeardownParallel(t *testing.T) {
	// This Run will not return until the parallel tests finish.
	t.Run("group", func(t *testing.T) {
		t.Run("Test1", func(t *testing.T) {
			t.Parallel()
			time.Sleep(1)
			fmt.Println("Test1")
		})
		t.Run("Test2", func(t *testing.T) {
			t.Parallel()
			time.Sleep(1)
			fmt.Println("Test2")
		})
		t.Run("Test3", func(t *testing.T) {
			t.Parallel()
			time.Sleep(1)
			fmt.Println("Test3")
		})
	})
	// <tear-down code>
}
```

����ָ�������������£�

* `go test -run '' ./01-testing`       ���иð������в��ԡ�
* `go test -run Foo ./01-testing`      ���иð�ƥ�� Foo �Ķ��������� "TestFoo"��
* `go test -run Foo/A= ./01-testing`   ���иð�ƥ�� Foo �Ķ������ԣ��Լ�ƥ�� "A=" ���Ӳ��ԡ�
* `go test -run /A=1 ./01-testing`     ���иð����ж������ԣ��Լ�ƥ�� "A=1" ���Ӳ��ԡ�
* `go test -fuzz FuzzFoo ./01-testing` Fuzz ƥ�� "FuzzFoo" ��Ŀ�ꡣ
* `go test -run=FuzzFoo/9ddb952d9814`  -run �����������������������Ͽ��е��ض�ֵ���Խ��е��ԡ�

### TestMain

���Ի��׼������ʱ��Ҫ��ִ��֮ǰ��֮����ж�������û��ж����ʱ����Ҫ������Щ���������߳������С�Ϊ��֧����Щ�������������������ļ�����һ�� `TestMain` ������`01-testing/07-testmain_test.go`��

```go
package testingdemo

import (
	"fmt"
	"os"
	"testing"
)

func TestMain(m *testing.M) {
	fmt.Println("+++ TestMain +++")
	os.Exit(m.Run())
}
```

TestMain ��д�Ļ���Ҫ��Ϊ��

* Դ����ļ����� `_test.go` ��β��
* �������̶�Ϊ `TestMain`��
* ����ǩ��Ϊ `func (m *testing.M)`��
* �� `m.Run()` ����֮ǰ����һЩ׼��������
* �� `m.Run()` ����֮����һЩ���չ�����
* ������ `os.Exit`�������Ϊ `m.Run()` �ķ���ֵ��

TestMain ��һ���ͼ�ԭ����ڳ�����Թ��ܾ��㹻�˵���ʱ�������󣬲�Ӧ���Ǳ���ġ�

### ����˵��

* `_test.go` �ж�������ͺͺ�����ֻ�ܱ�ͬһ�����е��ļ����ã������������룬�μ���[issue](https://github.com/golang/go/issues/39565)��
* `_test.go` �ļ��İ���������ѡ��
    * ����Դ����İ�����Դ�����ļ��İ�����ͬ��������ʾ���е� `package testingdemo`����ʱ����ֱ�Ӷ�**δ����**�������������в��ԡ�
    * ����Դ����İ���ΪԴ�����ļ��İ����� `_test` ��׺��������ʾ���е� `testingdemo`�����԰�����Ϊ `testingdemo_test`����ʱ��ֻ�ܲ��԰���Դ�������ڲ�ͬ�İ������ֻ�ܶ�**����**�������������в��ԡ��ó����ʺϣ�
        * ����Ҫ����**δ����**�����������ĳ���
        * ���ܵ���ѭ�����õĳ���
* go test ����ʱ�����Ժ����ͽ��̡�Э�̵Ĺ�ϵΪ�����Դ���μ����ģ���
    * ͬһ���������в��Ժ���������ͬһ��������ִ�У���ͬ���Ĳ��Ժ����ڲ�ͬ�Ľ�����ִ�С�
    * `TestMain` �� 1 ��Э����ִ�У����ڲ��Ժ���
        * ������Ժ���ȫ������ `Parallel` �ģ����е��� 2 ��Э����ִ�С�
        * ����� `Parallel` �ģ�����Ժ����Ტ���� `Parallel` ������ٲ�ͬ��Э�̲���ִ�С�

`01-testing/a/a_test.go`

```go
package a

import (
	"fmt"
	"os"
	"runtime"
	"testing"
)

func TestA1(t *testing.T) {
	fmt.Println("+++", "A1 Goroutine Num", runtime.NumGoroutine(), "A1 Pid", os.Getpid())
	fmt.Println()
}

func TestA2(t *testing.T) {
	fmt.Println("+++", "A2 Goroutine Num", runtime.NumGoroutine(), "A2 Pid", os.Getpid())
	fmt.Println()
}

func TestMain(m *testing.M) {
	fmt.Println("+++", "A TestMain Goroutine Num", runtime.NumGoroutine(), "A TestMain Pid", os.Getpid())
	os.Exit(m.Run())
}
```

`01-testing/b/b_test.go`

```go
package b

import (
	"fmt"
	"os"
	"runtime"
	"testing"
)

func TestB1(t *testing.T) {
	t.Parallel()
	fmt.Println("+++", "B1 Goroutine Num", runtime.NumGoroutine(), "B1 Pid", os.Getpid())
	fmt.Println()
}

func TestB2(t *testing.T) {
	t.Parallel()
	fmt.Println("+++", "B2 Goroutine Num", runtime.NumGoroutine(), "B2 Pid", os.Getpid())
	fmt.Println()
}

func TestMain(m *testing.M) {
	fmt.Println("+++", "B TestMain Goroutine Num", runtime.NumGoroutine(), "B TestMain Pid", os.Getpid())
	os.Exit(m.Run())
}
```

���� `go test -run '' ./01-testing/a ./01-testing/b -v`��������£�

```
+++ A TestMain Goroutine Num 1 A TestMain Pid 98270
=== RUN   TestA1
+++ A1 Goroutine Num 2 A1 Pid 98270

--- PASS: TestA1 (0.00s)
=== RUN   TestA2
+++ A2 Goroutine Num 2 A2 Pid 98270

--- PASS: TestA2 (0.00s)
PASS
ok      github.com/rectcircle/go-test-demo/01-testing/a 1.174s
+++ B TestMain Goroutine Num 1 B TestMain Pid 98271
=== RUN   TestB1
=== PAUSE TestB1
=== RUN   TestB2
=== PAUSE TestB2
=== CONT  TestB1
+++ B1 Goroutine Num 3 B1 Pid 98271

--- PASS: TestB1 (0.00s)
=== CONT  TestB2
+++ B2 Goroutine Num 2 B2 Pid 98271

--- PASS: TestB2 (0.00s)
PASS
ok      github.com/rectcircle/go-test-demo/01-testing/b 1.698s
```

### `go test` ����

`go test` ����������ģʽ��

* `cd packagexxx && go test` ����Ŀ¼ģʽ����ֱ�����е�ǰĿ¼�µİ����� `packagexxx` Ŀ¼�µİ��Ĳ��ԡ�
* `go test ./packagexxx` ���б�ģʽ������ָ�����µĲ��ԣ�`./packagexxx` ����ָ��������� `./a /.b`����Ҳ���Կ���ʹ�� `./xxx/...`��`./...`�����Ը�Ŀ¼�µ����а����ڸ�ģʽ�£�`go test` ��ʹ�û��棬����ͨ�� `go clean -testcache` �����棬����ͨ���ֶ�ָ�� `-count 1` �����û��档

`go test` ������־������ʾ��

* ѡ�����Ŀ��ı�־
    * `-run regexp` ֻ������������ʽƥ��ĳ�����ԡ�Example��Fuzz ���������Ͽ⡣Ĭ��ֵΪ `''`�����������в��ԡ�regexp �ᰴ�ղ������ŵ� `/` �ָ�Ϊ���������ʽ�����Ҳ��Ա�ʶ����ÿ�����ֶ�����ƥ�������е���ӦԪ�ء�ע�⣬���� `-run=X/Y` ������������ `X` ���� `X/Y` �����ڣ��� `X` �Իᱻִ�У���Ϊ�������� `X`�����ܲ��ҵ��� `X/Y` �Ƿ���ڡ�
    * `-bench regexp` ��������������ʽƥ��Ļ�׼��Ĭ������£��������κλ�׼���ԡ�Ҫ�������л�׼���ԣ���ʹ�� `'-bench .'` �� `'-bench=.'`�� ������ʽ�ɲ������ŵ�б�� (/) �ַ����Ϊһϵ��������ʽ�����һ�׼��ʶ����ÿ�����ֶ�����ƥ�������е���ӦԪ�أ�����У��� ƥ��Ŀ��ܸ����� `b.N=1` ������ʶ���ӻ�׼�� ���磬���� `-bench=X/Y`��ƥ�� `X` �Ķ�����׼�� `b.N=1` ���У����ҵ�ƥ�� Y ���κ��ӻ�׼��Ȼ���������С�
    * `-fuzz regexp` ģ�����Եķ�ʽ������ Fuzz ���ԣ�Ĭ������²�����ģ�����ԡ�ָ��ʱ�������в�����������ģ���е�һ������ȫƥ�䣬��������ʽ������ð��е�һ��ģ��������ȫƥ�� ��ģ�����Խ��ڳ�����ԡ���׼���ԡ�����ģ�����Ե��������Ͽ�� Example ��ɺ���С�
    * `-list regexp` �г����з���������ʽ�Ķ�����ԣ����������κβ��ԡ�
* ͨ�ò���
    * `-v` �������ϸ�ڣ����������ֶ������־��
    * `-timeout d` ��ʱʱ�䣬Ĭ��Ϊ 10 ���� (10m)��
    * `-short` ���߳�ʱ�����еĲ������������ǵ�����ʱ�䡣��Ĭ�Ϲرգ����� all.<span data-word-id="36908372" class="abbreviate-word">bash</span> �ڼ����ã��Ա㰲װ Go ���������н�ȫ�Լ�飬�����ܻ�ʱ�������꾡�Ĳ��� (��һ�䲻��⣬��� [all.bash](https://go.dev/src/all.bash)��) ��
    * `-vet list` �ڲ���ǰ���� `go vet`
    * `-failfast` �ڵ�һ�β���ʧ�ܺ�Ҫ��ʼ�µĲ��ԣ�����ʧ�ܡ�
    * `-json` �� JSON ��ʽ��¼��ϸ����Ͳ��Խ�����������������ɶ���ʽ�� -v ��־��ͬ����Ϣ��
    * `-parallel n` ָ `t.Parallel` ���ú���������������������еĲ�����Ŀ�� �ڽ���ģ������ʱ���ñ�־��ֵ�ǿ���ͬʱ����ģ������������ӽ��������������Ƿ������ `t.Parallel`�� Ĭ������£�-parallel ����Ϊ GOMAXPROCS ��ֵ�� �� -parallel ����Ϊ���� GOMAXPROCS ��ֵ���ܻ����� CPU ���ö����������½�����������ģ������ʱ�� ��ע�⣬-parallel �������ڵ������Զ������ļ��������� ���� -p ��־�����ã�`go test` ����Ҳ���Բ������в�ͬ���Ĳ��ԣ��μ� `go help build`����
    * `-shuffle off,on,N` �������ִ��˳��Ĭ��Ϊ off��`N` Ϊָ��һ����������ӡ�
* �� `-run`��`-bench` ƥ��Ĳ��Ե�����
    * `-count n`���� `-fuzz` ����Ч��Ĭ��Ϊ 1 ���ڰ��б�ģʽ�����Ի��棩���ֶ�ָ�� 1 �����ò��Ի��档�ò���������ָ���������еĴ�������������� -cpu����Ϊÿ�� GOMAXPROCS ֵ���� n �Ρ�
    * `-cpu 1,2,4` ָ�����в��Ե� GOMAXPROCS �б�Ĭ��ֵΪ��ǰ GOMAXPROCS ֵ��ÿ�����Ժ��������ÿһ�� cpu ֵ����һ�Ρ�
* �� `-bench`  ƥ��Ĳ��Ե�����
    * `-benchtime t` ��ÿ����׼�����㹻�ĵ����Ի�ȡָ���� t ��Ϊ time.Duration�����磬`-benchtime 1h30s`����Ĭ��ֵΪ 1 �� (`1s`)�������﷨ Nx ��ʾ����׼ N �Σ����磬`-benchtime 100x`����
    * `-benchmem` ��ӡ��׼���Ե��ڴ����ͳ����Ϣ��
* �� `-fuzz` ƥ��Ĳ��Ե�����
    * `-fuzztime t` �� `-benchtime t` ���ơ�
    * `-fuzzminimizetime t` �� `-fuzztime t` ���ƣ���ʾ��Сֵ��
* ���������
    * `-cover` ���ø�����ͳ��
    * `-covermode set,count,atomic`  �������ڲ��Եİ��ĸ����ʷ���ģʽ��Ĭ��ֵΪ `set`��������� `-race`��Ĭ��ֵΪ `atomic`��
        * set: bool: �������Ƿ����С�
        * count: int: �����������˶��ٴΡ�
        * atomic: int: count�����ڶ��̲߳������Ǿ�ȷ�ģ����Ǵ��۸��ߡ�
    * `-coverpkg pattern1,pattern2,pattern3` ��ÿ�������ж�ƥ��ģʽ�İ�Ӧ�ø����ʷ�����Ĭ������£�ÿ������ֻ�������ڲ��Եİ����йذ�ģʽ������������� `go help packages`��
    * `-coverprofile cover.out` �����в���ͨ���󣬽������������ļ�д����ļ���
* ���ܼ����أ��μ���[ԭ��](https://pkg.go.dev/cmd/go#hdr-Testing_flags)��
    * `-blockprofile block.out`
    * `-blockprofilerate n`
    * `-cpuprofile cpu.out`
    * `-memprofile mem.out`
    * `-memprofilerate n`
    * `-mutexprofile mutex.out`
    * `-mutexprofilefraction n`
    * `-outputdir directory`
    * `-trace trace.out`
* ���빹����ر�־
    * `go help build` ��ر�־
    * `-args` �������е����ಿ�֣�-args ֮����������ݣ����ݸ����Զ������ļ���δ��������δ���ġ� ��Ϊ�����־ռ���������е�ʣ�ಿ�֣����԰��б�������ڣ���������������־֮ǰ��
    * `-c` �����Զ������ļ�����Ϊ `pkg.test` ����Ҫ������������ pkg �ǰ�����·�������һ��Ԫ�أ��� ����ʹ�� -o ��־�����ļ�������һ������ `go test ./01-testing -c`��
    * `-o file` �����Զ������ļ����뵽ָ���ļ���������Ȼ���У�����ָ���� -c �� -i����
    * `-exec xprog` ʹ�� xprog ���в��Զ������ļ��������`go help run`��
    * `-i` �ԣ��ѷ�����

## Go �ٷ�ά���� Mock ��

> �汾��[v1.6.0](https://pkg.go.dev/github.com/mock/mockgen@v1.6.0)

### ʾ������

���������ڿ���һ�����ͺ�˵� article ģ�飬�����������㣺

* service ҵ���߼�������� repository ��ĺ������� repository �� service ��������
* repository ���ݲ��ݲ㣬�����ݿ���ⲿ���ݴ洢�Ĳ����ķ�װ��

ģ�ͺͽӿ������� `02-mock/domain/`

```go
// article.go
package domain

type Article struct {
	ID      int64
	Author  string
	Title   string
	Tags    []string
	Content string
}

type ArticleRepository interface {
	FindByID(id int64) (*Article, error)
	Create(*Article) (int64, error)
}

type ArticleService interface {
	Publish(author string, title string, tags []string, content string) (*Article, error)
	Get(id int64) (*Article, error)
}

// error.go
package domain

import "errors"

var (
	ErrRecordNotFound   = errors.New("record not found")
)
```

service ��ʵ�֣�`02-mock/article/service.go`

```go
package article

import "github.com/rectcircle/go-test-demo/02-mock/domain"

type service struct {
	repository domain.ArticleRepository
}

func NewService(r domain.ArticleRepository) (domain.ArticleService, error) {
	return &service{
		repository: r,
	}, nil
}

func (s *service) Get(id int64) (*domain.Article, error) {
	return s.repository.FindByID(id)
}

func (s *service) Publish(author string, title string, tags []string, content string) (*domain.Article, error) {
	id, err := s.repository.Create(&domain.Article{
		ID:      0,
		Author:  author,
		Title:   title,
		Tags:    tags,
		Content: content,
	})
	if err != nil {
		return nil, err
	}
	return s.Get(id)
}

```

### Ϊʲô��Ҫ Mock

��ʱ��������Ҫ��д�������������� service ��ĺ��������ʹ�� repository ��ʵ�ֵĻ�������Ϊÿ�β��ԣ���Ҫ׼��һ���������ݿ⣬����д <span data-word-id="646" class="abbreviate-word">sql</span> ��׼�����ݡ����������������⣺

* ���ݿ���ⲿ������װ���ӣ��ɱ��ߣ�����׼���鷳��
* ���� service �����ⲿ������û�в��Ի����������޷�������״̬����ʱ service �Ĳ��Ծ��޷����С�
* �� service �Ĳ��Ա������� repository �������ܽ��У��� repository �Ŀ���������������Ա���𣬴���������ϵ��

���������������Ǿ���Ҫ Mock��ģ�⣩ ���⺯����������

### Mock ��ǰ������

���ȶԴ��⺯���Ĳ��Բ����޸Ĵ��⺯�������Ҫ����Ҫ Mock �Ĵ��⺯�������ǿɲ�εġ�

������������У��� Go �����У����Ҫ�� repository ������һ���ӿڶ�������һ����������͡���ʱ���ǾͿ���дһ�� repository �� Mock ʵ�֣��ڲ���ʱ׼���׶Σ�ʹ�� Mock ������ service��Ȼ��Ϳ��Ա�д���� case �ˡ�

### Mock ��ĺ�������

��Ȼ�������ֶ���дһ�� repository �ӿڵ� Mock ʵ�֣����ǻ�����������⣺���ÿһ�� service �� case������Ҫ����һ�� Mock ʵ�֣��ڲ�ʱ�������㹻�ߵ�����£�Mock ��������ǳ��࣬������������������롣

��ˣ�Ϊ������������룬���Գ����һ�� Mock ���߿⣬�ù���������������

* ���ݽӿ������ҽ�����һ�� Mock ʵ�ֵĴ��롣
* ����ͨ����̵ķ�ʽ����������ӿ� Mock ʵ�ֵ�ÿ��������ʲô���Ĳ����·���ʲô���Ľ������׮����
* ����ͨ����̵ķ�ʽ����������ӿ� Mock ʵ�ֵ�ÿ�������ڻ���ö��ٴΣ��Ƿ�ᱻ���á��ӱ��⺯�������������ĽǶȣ����Ա��⺯������Ϊ�Ƿ����Ԥ�ڣ���׮����

[golang/mock](https://github.com/golang/mock) ��ʵ��������������

### ʹ�� [golang/mock](https://github.com/golang/mock) ʾ��

#### ��װ����������

```
go install github.com/golang/mock/mockgen@v1.6.0
```

#### ���� Mock ����

ͨ�� `go:generate` ע�ͣ��������ɴ��롣

�� `02-mock/domain/article.go` �������ע�ͣ�

```
//go:generate mockgen -destination=./mock/mock_article_repository.go -package=mock github.com/rectcircle/go-test-demo/02-mock/domain ArticleRepository
```

ִ�� `mkdir -p 02-mock/domain/mock &&  go generate ./...` ���ɴ��롣

���뽫���ɵ� `02-mock/domain/mock/mock_article_repository.go` �ļ��С�

#### ��д���� Case

`02-mock/article/service_test.go`

```go
package article

import (
	"reflect"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/rectcircle/go-test-demo/02-mock/domain"
	"github.com/rectcircle/go-test-demo/02-mock/domain/mock"
)

func Test_service_Get(t *testing.T) {
	want := domain.Article{
		ID:      1,
		Author:  "author",
		Title:   "title",
		Tags:    []string{"go"},
		Content: "content",
	}

	// ׼�� Mock ��������
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	// ����һ�� Mock �� ArticleRepository �ӿڵ�ʵ�� m��
	//   ��ʵ�ֵĴ����� mockgen ��������
	//   ��ʵ�ֵ� mock �ĺ����ķ���ֵͨ�� m.EXPECT() ��������
	m := mock.NewMockArticleRepository(ctrl)
	// ������ʹ�� 1 ���� m.FindByID ʱ������ want��
	m.EXPECT().FindByID(gomock.Eq(int64(1))).Return(&want, nil)
	// ������ʹ�÷� 1 ���� m.FindByID ʱ������ û�з��ִ���
	m.EXPECT().FindByID(gomock.Not(int64(1))).Return(nil, domain.ErrRecordNotFound)

	// �������ʵ������ mock ���� m ���ݸ���ʵ��
	s, _ := NewService(m)
	// ִ�в���
	t.Run("success", func(t *testing.T) {
		got, err := s.Get(1)
		if err != nil {
			t.Fatalf("s.Get(1) err want nil, got %s", err)
		}
		if reflect.DeepEqual(got, want) {
			t.Fatalf("s.Get(1) want %+v, got %+v", want, got)
		}
	})
	t.Run("notFound", func(t *testing.T) {
		_, err := s.Get(2)
		if err == nil {
			t.Fatalf("s.Get(2) err want %s, got nil", domain.ErrRecordNotFound)
		}
	})
}

func Test_service_Publish(t *testing.T) {
	want := domain.Article{
		ID:      1,
		Author:  "author",
		Title:   "title",
		Tags:    []string{"go"},
		Content: "content",
	}

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()
	m := mock.NewMockArticleRepository(ctrl)
	data := map[int64]domain.Article{}
	id := int64(1)
	m.EXPECT().FindByID(gomock.Any()).DoAndReturn(func(id int64) (*domain.Article, error) {
		if a, ok := data[id]; ok {
			return &a, nil
		} else {
			return nil, domain.ErrRecordNotFound
		}
	})
	m.EXPECT().Create(gomock.Any()).DoAndReturn(func(a *domain.Article) (int64, error) {
		a.ID = id
		id += 1
		data[a.ID] = *a
		return a.ID, nil
	})

	s, _ := NewService(m)
	t.Run("success", func(t *testing.T) {
		got, err := s.Publish(want.Author, want.Title, want.Tags, want.Content)
		if err != nil {
			t.Fatalf("s.Publish(1) err want nil, got %s", err)
		}
		want.ID = got.ID
		if reflect.DeepEqual(got, want) {
			t.Fatalf("s.Publish(1) want %+v, got %+v", want, got)
		}
	})
}
```

* `ctrl := gomock.NewController(t)` ����ʵ�֣��ӱ��⺯�������������ĽǶȣ����Ա��⺯������Ϊ�Ƿ����Ԥ�ڣ�Ҳ����˵��� `m` �еķ��������ô����ͱ����õĲ��������� `m.EXPECT()` ��������`ctrl` ������ `t` ����ط�������Ǳ�����ʧ�ܡ�
* `m.EXPECT()` ����һ�����ö��󣬿������ã�ĳ�������������õĲ����б�����ֵ�����ô����ȣ���׮����
* ����׼����ɺ󣬱�д Case ���ɡ�

### [golang/mock](https://github.com/golang/mock) ������˵��

```
mockgen �����ֲ���ģʽ: source �� reflect��

��ʹ�� -source ��ʶʱ������ source ģʽ����ģʽͨ��Դ�����ļ������ɽӿڵ� mock ʵ�֡�
-imports �� -aux_files ������ Source ģʽ��ʹ�á�
ʾ����
        mockgen -source=foo.go [other options]


�����������Ǳ�ʾ�Ĳ���ʱ������ reflect ģʽ����ģʽͨ���������ӿ������ɽӿڵ� mock ʵ�֡�
�����������ֱ��ǣ�����·����ͨ�����ŷָ������б�
ʾ����
        mockgen database/sql/driver Conn,Driver

  -aux_files string
        (source ģʽ) ���ŷָ��� pkg=path ��ʾ auxiliary Go Դ�����ļ���ÿ̫��⣬���Կ���https://github.com/golang/mock/issues/181����
  -build_flags string
        (reflect ģʽ) ����� go build ������
  -copyright_file string
        Copyright �ļ�����ӵ����ɵ��ļ�ͷ��
  -debug_parser
        ֻ��ӡ�����������
  -destination string
        ��������ļ���Ĭ������� stdout��
  -exec_only string
        (reflect ģʽ) ������ã�ִ������������Դ���ļ����μ���-prog_only����
  -imports string
        (source ģʽ) ���ŷָ��� name=path ��ʾҪʹ�õ���ʽ���루����⣩��
  -mock_names string
        ���ŷָ��� interfaceName=mockName ��ʾ���ɵĽṹ������Ĭ��Ϊ 'Mock'+ �ӿ�����
  -package string
        ���ɴ���İ�����Ĭ��Ϊ 'mock_' + ��ǰ������
  -prog_only
        (reflect ģʽ) ֻ���ɷ������Դ�룻����д�� stdout ���˳���
  -self_package string
        The full package import path for the generated code. The purpose of this flag is to prevent import cycles in the generated code by trying to include its own package. This can happen if the mock's package is set to one of its inputs (usually the main one) and the output is stdio so mockgen cannot detect the final output package. Setting this flag will then tell mockgen which import to exclude.������⣩
  -source string
        (source ģʽ) ����� Go Դ�����ļ������� source ģʽ��
  -version
        ��ӡ�汾��
  -write_package_comment
        ���Ϊ true����д����ĵ�ע�� (godoc)�� ��Ĭ��Ϊ true����
```

* source ģʽ������ Go ��׼��� `"go/parser"`��
* ����ģʽ��������һ�� main ����Դ�룬Ȼ���������������������������ͨ�������ȡ���ӿڵ���Ϣ�������ɴ��롣

�����Ƽ�����ʹ�� source ģʽ����������⣬���Ի��˵�����ģʽ��

* source ģʽ���ܸߣ������ٶȿ졣
* source ģʽ���ɵĴ�����Ա�����������Ϣ�������ڱ�д׮���롣
* source ģʽ��ȱ�㣺
    * �� [issue](https://github.com/golang/mock/issues) ��������ͦ������ġ�
    * �޷�ָ������ĳ���ӿڣ�-source �������������ӿڣ����ᱻ���ɡ�

### [golang/mock](https://github.com/golang/mock) API

* `MockXxx.EXPECT()` ���� MockXxxRecorder ����ָ�롣
* `MockXxxRecorder.������(...)`
    * ����Ϊ nil����ȷֵ ���� [`gomock.Matcher`](https://pkg.go.dev/github.com/golang/mock@v1.6.0/gomock#Matcher)  ����ƥ������ԣ�������⺯������ʱ��û��ƥ�䵽����ʧ�ܡ�
        * `All` ƥ����������
        * `AssignableToTypeOf` ƥ������
        * `Eq` ��ȷֵ
        * `InAnyOrder` ����˳��ļ���
        * `Len` ���鳤��
        * `Nil` Ϊ nil
        * `Not` ��Ϊĳ��ֵ
        * �޸�ʧ�� Got �� Want �ǵ������ʽ���μ��� [README](https://github.com/golang/mock#modifying-failure-messages)
    * ����ֵΪ [`*gomock.Call`](https://pkg.go.dev/github.com/golang/mock@v1.6.0/gomock#Call) ��������������ʱ��һЩ��Ϊ���߶��ԡ�
        * `After` ��������˳��
        * `AnyTimes`��`Times`��`MaxTimes`��`MinTimes` �������õĴ�����ֵ�����ֵ����Сֵ���ȡ�
        * `Return` ���巵��ֵ��
        * `Do`��`DoAndReturn` ������ʱ��ִ�к��������ء�
        * `SetArg` �޸ĺ������õĲ�����Ӧ�÷�����֮��
        * ͨ��Դ���֪����� `Return`��`DoAndReturn` �������˶�Σ������ķ���ֵ�����һ���ķ���ֵΪ׼��

## Go ���������Ĳ��Կ� Testify

> �汾��[v1.8.0](https://pkg.go.dev/github.com/stretchr/testify@v1.8.0)

Testify �� Go ���������Ĳ��Թ��߼��������������ԣ�

* ���õĶ���
* Mock
* �����׼��ӿںͺ���

### assert ��

�ṩ���ƶ��Ķ��Ժ�����ʾ�� `03-testify/assert_test.go` ���£�

```go
package testifydemo_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSomething(t *testing.T) {
	// ��ȶ���
	assert.Equal(t, 123, 123, "they should be equal")

	// ���ȶ���
	assert.NotEqual(t, 123, 456, "they should not be equal")

	// nil ����
	assert.Nil(t, nil)

	// �� nil ����
	got2 := "Something"
	if assert.NotNil(t, got2) {
		// ���� got2 ���� nil
		// ���԰�ȫ�ؽ��н�һ���Ķ��Զ����ᵼ���κδ���
		assert.Equal(t, "Something", got2)
	}
}
```

stretchr/testify �� [assert ��](https://pkg.go.dev/github.com/stretchr/testify@v1.8.0/assert)���ṩ��һϵ�к�������װ�˳����Ķ����߼���������ʧ��ʱ����Щ�������ѺõĴ�ӡ��ʧ�ܵ�ԭ�򣬴��������ȸ�����Ϣ���� `assert.Equal(t, 123, 124, "they should be equal")` ������£�

```
=== RUN   TestSomething
    /Users/xxx/Workspace/personal/go-test-demo/03-testify/assert_test.go:11:
        	Error Trace:	/Users/xxx/Workspace/personal/go-test-demo/03-testify/assert_test.go:11
        	Error:      	Not equal:
        	            	expected: 123
        	            	actual  : 124
        	Test:       	TestSomething
        	Messages:   	they should be equal
```

�����Ķ��Ժ������£�

| ���� | ˵�� |
|------|-----|
| `func ObjectsAreEqual(expected, actual interface{}) bool ` | ��Ҫʹ�ã��ⲻ��һ�����Ժ������μ���[issue](https://github.com/stretchr/testify/issues/1180) |
| `func ObjectsAreEqualValues(expected, actual interface{}) bool` | ��Ҫʹ�ã��ⲻ��һ�����Ժ������μ���[issue](https://github.com/stretchr/testify/issues/1180) |
| `func FailNow(t TestingT, failureMessage string, msgAndArgs ...interface{}) bool` | �ѺõĴ�ӡʧ����Ϣ�����ʧ�ܲ��˳���ǰЭ�̣�һ�㲻��Ҫֱ��ʹ�� |
| `func Fail(t TestingT, failureMessage string, msgAndArgs ...interface{}) bool` | �ѺõĴ�ӡʧ����Ϣ�����ʧ�ܣ�һ�㲻��Ҫֱ��ʹ�� |
| `func Implements(t TestingT, interfaceObject interface{}, object interface{}, msgAndArgs ...interface{}) bool` | ���� `object` �Ƿ�ʵ���� `interfaceObject` �ӿڣ��� `assert.Implements(t, (*MyInterface)(nil), new(MyObject))` |
| `func IsType(t TestingT, expectedType interface{}, object interface{}, msgAndArgs ...interface{}) bool ` | ���� `object` �����ͺ� `expectedType` �������Ƿ���ͬ |
| `func Equal(t TestingT, expected, actual interface{}, msgAndArgs ...interface{}) bool` | ����ֵ�Ƿ���ͬ��ָ�����������Ǹ�������ֵ�������ȷ���ģ�������������ʧ�ܣ��� `assert.Equal(t, 123, 123)` |
| `func NotEqual(t TestingT, expected, actual interface{}, msgAndArgs ...interface{}) bool` | �μ���`Equal` |
| `func Same(t TestingT, expected, actual interface{}, msgAndArgs ...interface{}) bool` | ��������ָ���������ͬ����ָ���ַ��ͬ |
| `func NotSame(t TestingT, expected, actual interface{}, msgAndArgs ...interface{}) bool` | �μ���`Same` |
| `func EqualValues(t TestingT, expected, actual interface{}, msgAndArgs ...interface{}) bool ` | ������ȣ����ת��Ϊ��ͬ��������ȣ��� `assert.EqualValues(t, uint32(123), int32(123))` ���� true |
| `func NotEqualValues(t TestingT, expected, actual interface{}, msgAndArgs ...interface{}) bool` | �μ���`EqualValues` |
| `func Exactly(t TestingT, expected, actual interface{}, msgAndArgs ...interface{}) bool` | ����ֵ�����Ͷ���ͬ����ȷ��ȣ����� `assert.Exactly(t, int32(123), int64(123))` ���� false |
| `func Nil(t TestingT, object interface{}, msgAndArgs ...interface{}) bool` | ���Զ����Ƿ�Ϊ nil |
| `func NotNil(t TestingT, object interface{}, msgAndArgs ...interface{}) bool` | �μ���`Nil` |
| `func Empty(t TestingT, object interface{}, msgAndArgs ...interface{}) bool` | ������ emtpy������ nil, "", false, 0 ���� len == 0 ����Ƭ�� chan ���� empty |
| `func NotEmpty(t TestingT, object interface{}, msgAndArgs ...interface{}) bool` | �μ���`Empty` |
| `func Len(t TestingT, object interface{}, length int, msgAndArgs ...interface{}) bool` | ����ָ���Ķ�������ض��ĳ��ȡ� ����������޷� `len()` �Ļ�ʧ�ܣ��� `assert.Len(t, mySlice, 3)` |
| `func True(t TestingT, value bool, msgAndArgs ...interface{}) bool` | ���Զ����Ƿ�Ϊ true |
| `func False(t TestingT, value bool, msgAndArgs ...interface{}) bool` | ���Զ����Ƿ�Ϊ false |
| `func Contains(t TestingT, s, contains interface{}, msgAndArgs ...interface{}) bool` | a) �����ַ����Ƿ����һ���Ӵ����� `assert.Contains(t, "Hello World", "World")`��b) list(array, slice...) �Ƿ����һ��Ԫ�أ��� `assert.Contains(t, ["Hello", "World"], "World")`��c) map �Ƿ����һ��Ԫ�� `assert.Contains(t, {"Hello": "World"}, "Hello")` |
| `func NotContains(t TestingT, s, contains interface{}, msgAndArgs ...interface{}) bool` | �μ���`Contains` |
| `func Subset(t TestingT, list, subset interface{}, msgAndArgs ...interface{}) (ok bool)` | ���� subset �Ƿ��� list(array, slice...) ���Ӽ� |
| `func NotSubset(t TestingT, list, subset interface{}, msgAndArgs ...interface{}) (ok bool)` | �μ���`Subset` |
| `func ElementsMatch(t TestingT, listA, listB interface{}, msgAndArgs ...interface{}) (ok bool)` | �������� list (array, slice...) ��Ԫ���Ƿ���ȫ��ͬ������˳�򣩣� �� `assert.ElementsMatch(t, [1, 3, 2, 3], [1, 3, 3, 2])` Ϊ true |
| `func Panics(t TestingT, f PanicTestFunc, msgAndArgs ...interface{}) bool` | ���� f �����Ƿ� panic��ԭ���� f ͨ�� `recover()` ���գ� |
| `func NotPanics(t TestingT, f PanicTestFunc, msgAndArgs ...interface{}) bool ` | �μ���`Panics` |
| `func PanicsWithValue(t TestingT, expected interface{}, f PanicTestFunc, msgAndArgs ...interface{}) bool` | ���� f �����Ƿ��� panic �� painc ���յ�ֵ�� excepted ��ͬ (`==`)���磺`assert.PanicsWithValue(t, "crazy error", func(){ GoCrazy() })` |
| `func PanicsWithError(t TestingT, errString string, f PanicTestFunc, msgAndArgs ...interface{}) bool` | ���� f �����Ƿ��� panic �� panic ���յ�ֵΪ error �� `error.Error()` ��ֵ�� errString ��ͨ���磺`assert.PanicsWithError(t, "crazy error", func(){ GoCrazy() })` |
| `func WithinDuration(t TestingT, expected, actual time.Time, delta time.Duration, msgAndArgs ...interface{}) bool` |����������ʱ�����ʱ���Ƿ��� delta �ڣ��� `assert.WithinDuration(t, time.Now(), time.Now(), 10*time.Second)` |
| `func WithinRange(t TestingT, actual, start, end time.Time, msgAndArgs ...interface{}) bool` | ���� actual �Ƿ��� start �� end ֮�䣨�������� �� `assert.WithinRange(t, time.Now(), time.Now().Add(-time.Second), time.Now().Add(time.Second))` |
| `func InDelta(t TestingT, expected, actual interface{}, delta float64, msgAndArgs ...interface{}) bool` | �������������ֵĲ�ֵ�� delta ��Χ�ڣ��� `assert.InDelta(t, math.Pi, 22/7.0, 0.01)` |
| `func InDeltaSlice(t TestingT, expected, actual interface{}, delta float64, msgAndArgs ...interface{}) bool` | �� `InDelta` ���ƣ����� expected, actual ��Ƭ�Ķ�Ӧ����������Ԫ�صĵĲ�ֵ�� delta ��  |
| `func InDeltaMapValues(t TestingT, expected, actual interface{}, delta float64, msgAndArgs ...interface{}) bool` | �� `InDelta` ���ƣ����� expected, actual Map �Ķ�Ӧ����������Ԫ�صĵĲ�ֵ�� delta �� |
| `func InEpsilon(t TestingT, expected, actual interface{}, epsilon float64, msgAndArgs ...interface{}) bool` | ���� `(abs(expected - actual) / abc(expected)) <= epsilon` |
| `func InEpsilonSlice(t TestingT, expected, actual interface{}, epsilon float64, msgAndArgs ...interface{}) bool` | �� `InEpsilon` ���ƣ����� expected, actual ��Ƭ�Ķ�Ӧ����������Ԫ������ `InEpsilon` |
| `func InEpsilonSlice(t TestingT, expected, actual interface{}, epsilon float64, msgAndArgs ...interface{}) bool` | �� `InEpsilon` ���ƣ����� expected, actual ��Ƭ�Ķ�Ӧ����������Ԫ������ `InEpsilon` |
| `func Error(t TestingT, err error, msgAndArgs ...interface{}) bool` | ���� err �Ƿ�Ϊ nil |
| `func NoError(t TestingT, err error, msgAndArgs ...interface{}) bool` | �μ���`NoError` |
| `func EqualError(t TestingT, theError error, errString string, msgAndArgs ...interface{}) bool` | ���� `theError.Error()` �� errorString �Ƿ���� |
| `func ErrorContains(t TestingT, theError error, contains string, msgAndArgs ...interface{}) bool` | ���� `theError.Error()` �Ƿ���� `contains` �Ƿ���� |
| `func Regexp(t TestingT, rx interface{}, str interface{}, msgAndArgs ...interface{}) bool` | �����ַ����Ƿ��������ʽƥ�䣬�� `assert.Regexp(t, regexp.MustCompile("start"), "it's starting")`��`assert.Regexp(t, "start...$", "it's not starting")` |
| `func NotRegexp(t TestingT, rx interface{}, str interface{}, msgAndArgs ...interface{}) bool` | �μ��� `Regexp` |
| `func Zero(t TestingT, i interface{}, msgAndArgs ...interface{}) bool` | ���� i �Ƿ�����ֵ |
| `func NotZero(t TestingT, i interface{}, msgAndArgs ...interface{}) bool` | �μ���`Zero` |
| `func FileExists(t TestingT, path string, msgAndArgs ...interface{}) bool` | �����ļ��Ƿ���ڣ������Ŀ¼��ʧ�� |
| `func NoFileExists(t TestingT, path string, msgAndArgs ...interface{}) bool` | �μ��� `FileExists` |
| `func DirExists(t TestingT, path string, msgAndArgs ...interface{}) bool` | ����Ŀ¼�Ƿ���� |
| `func NoDirExists(t TestingT, path string, msgAndArgs ...interface{}) bool` | �μ��� `DirExists` |
| `func JSONEq(t TestingT, expected string, actual string, msgAndArgs ...interface{}) bool` | �������� JSON �ַ����Ƿ���ȣ��� ```assert.JSONEq(t, `{"hello": "world", "foo": "bar"}`, `{"foo": "bar", "hello": "world"}`)``` |
| `func YAMLEq(t TestingT, expected string, actual string, msgAndArgs ...interface{}) bool` | �������� YAML �ַ����Ƿ���� |
| `func Eventually(t TestingT, condition func() bool, waitFor time.Duration, tick time.Duration, msgAndArgs ...interface{}) bool` |  �ú���ÿ���� tick ʱ�䣬����һ�� `condition` ����������� `waitFor` ʱ���ڷ��� true ����Գɹ����� `assert.Eventually(t, func() bool { return true; }, time.Second, 10*time.Millisecond)` |
| `func Never(t TestingT, condition func() bool, waitFor time.Duration, tick time.Duration, msgAndArgs ...interface{}) bool` | �μ��� `Eventually`������ `waitFor` ���� condition û�з��� true |
| `func ErrorIs(t TestingT, err, target error, msgAndArgs ...interface{}) bool` | ͨ�� `errors.Is` ���ж��� |
| `func NotErrorIs(t TestingT, err, target error, msgAndArgs ...interface{}) bool` | �μ���`ErrorIs` |
| `func ErrorAs(t TestingT, err error, target interface{}, msgAndArgs ...interface{})` | ͨ�� `errors.As` ���ж��� |

### require ��

������ [assert ��](https://pkg.go.dev/github.com/stretchr/testify@v1.8.0/assert) ����ͬ������ [require](https://pkg.go.dev/github.com/stretchr/testify@v1.8.0/require) �����ڶ���ʧ�ܺ������˳���

### mock ��

�����������ᵽ�� [golang/mock](https://github.com/golang/mock) ���ƣ��ڴ˲�������ˡ�����ֱ��ʹ�� <span data-word-id="1024" class="abbreviate-word">golang</span>/mock��

### suite ��

�ṩ����������������ԵĲ����׼����� junit���������� <span data-word-id="484" class="abbreviate-word">IDE</span> ���� <span data-word-id="37427572" class="abbreviate-word">VSCode</span> [Go ��չ](https://github.com/golang/vscode-go/blob/master/CHANGELOG.md#0684---29th-june-2018)���Ըð��ṩ��ԭ����֧�֡�

ʾ�� `03-testify/suite_test.go` ���£�

```go
package testifydemo_test

// Basic imports
import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

// ��������׼��ṹ�壬Ƕ��һ�� suite.Suite���ýṹ�����һ�� T() �������Է���ԭ���� *testing.T
type ExampleTestSuite struct {
	suite.Suite
}

// �����׼������в��Ժ���ǰ��ִ����ִֻ��һ�θú�����
func (suite *ExampleTestSuite) SetupSuite() {
	fmt.Println("+++SetupSuite+++")
}

// �����׼������в��Ժ�����ִ����ִֻ��һ�θú�����
func (suite *ExampleTestSuite) TearDownSuite() {
	fmt.Println("+++TearDownSuite+++")
}

// �����׼��ڵ�ÿ������ǰ������ִ��һ�θú�����
func (suite *ExampleTestSuite) SetupTest() {
	fmt.Println("+++SetupTest+++")
}

// �����׼��ڵ�ÿ�����Ժ󣬶���ִ��һ�θú�����
func (suite *ExampleTestSuite) TearDownTest() {
	fmt.Println("+++TearDownTest+++")
}

// �����׼��ڵ�ÿ������ǰ������ִ��һ�θú�����
func (suite *ExampleTestSuite) BeforeTest(suiteName, testName string) {
	fmt.Printf("+++BeforeTest(suiteName=%s, testName=%s)+++\n", suiteName, testName)
}

// �����׼��ڵ�ÿ�����Ժ󣬶���ִ��һ�θú�����
func (suite *ExampleTestSuite) AfterTest(suiteName, testName string) {
	fmt.Printf("+++AfterTest(suiteName=%s, testName=%s)+++\n", suiteName, testName)
}

// �����׼������в��Ժ�����ִ����ִֻ��һ�θú��������Ի�ȡִ�н������ֹʱ�䡢�Ƿ�ͨ���������Ϣ��
func (suite *ExampleTestSuite) HandleStats(suiteName string, stats *suite.SuiteInformation) {
	fmt.Printf("+++HandleStats(suiteName=%s, stats=%+v)+++\n", suiteName, stats)
}

// �����׼��ڣ������� Test ��ͷ�ķ���������Ϊ��������
func (suite *ExampleTestSuite) TestExample1() {
	fmt.Println("+++TestExample1+++")
	assert.True(suite.T(), true)
}

// �����׼��ڣ������� Test ��ͷ�ķ���������Ϊ��������
// ע�⣺����ʹ�� suite.Suite �����Ķ��Ժ������Է������
func (suite *ExampleTestSuite) TestExample2() {
	fmt.Println("+++TestExample1+++")
	suite.True(true)
}

// Ϊ���� go test ��������׼���������Ҫ����һ�������Ĳ��Ժ��������׼���ָ�봫�ݸ� suite.Run ����
func TestExampleTestSuite(t *testing.T) {
	suite.Run(t, new(ExampleTestSuite))
}
```

ʹ�� `go test -run ^TestExampleTestSuite$ github.com/rectcircle/go-test-demo/03-testify -v -testify.m ^TestExample1$` ����������иò����ڵ�ĳ��������ԣ�ͨ�� `-testify.m` ָ������

ʹ�� `go test -run ^TestExampleTestSuite$ github.com/rectcircle/go-test-demo/03-testify -v` ����������и��׼������в��ԣ�������£�

```
=== RUN   TestExampleTestSuite
+++SetupSuite+++
=== RUN   TestExampleTestSuite/TestExample1
+++SetupTest+++
+++BeforeTest(suiteName=ExampleTestSuite, testName=TestExample1)+++
+++TestExample1+++
+++AfterTest(suiteName=ExampleTestSuite, testName=TestExample1)+++
+++TearDownTest+++
=== RUN   TestExampleTestSuite/TestExample2
+++SetupTest+++
+++BeforeTest(suiteName=ExampleTestSuite, testName=TestExample2)+++
+++TestExample1+++
+++AfterTest(suiteName=ExampleTestSuite, testName=TestExample2)+++
+++TearDownTest+++
+++TearDownSuite+++
+++HandleStats(suiteName=ExampleTestSuite, stats=&{Start:2022-08-14 00:30:45.337556 +0800 CST m=+0.003622966 End:2022-08-14 00:30:45.338018 +0800 CST m=+0.004085457 TestStats:map[TestExample1:0xc000262140 TestExample2:0xc000262190]})+++
--- PASS: TestExampleTestSuite (0.00s)
    --- PASS: TestExampleTestSuite/TestExample1 (0.00s)
    --- PASS: TestExampleTestSuite/TestExample2 (0.00s)
PASS
ok      github.com/rectcircle/go-test-demo/03-testify   1.193s
```

ͨ������ʾ�����Կ�����

* <span data-word-id="36379614" class="abbreviate-word">��������</span>�����Լ���������Ϊ�������ڣ�[suite/interfaces.go](https://github.com/stretchr/testify/blob/master/suite/interfaces.go)����

	```
	���������׼�
		|
		v
	SetupSuite
		|
		v
	 SetupTest       ---+
	 	|               |
		v               |
	 BeforeTest      ---+
	    |               |
		v               |
	  TestXxx        ---+-->  ÿ�����Խ�����ѭ��ִ��
	  	|               |
		v               |
	 AfterTest       ---+
		|               |
		v               |
	TearDownTest     ---+
		|
		v
	TearDownSuite
		|
		v
	HandleStats
	```

* go test ͨ�� `-testify.m` ����ʵ��ֻ����ĳ�����Ժ�����
* suite.Suite Ҳ������һϵ�ж��Ժ��� `suite.Xxx(...)`���ȼ���  `assert.Xxx(suite.T(), ...)`
