
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Teacher
 * 
 */
export type Teacher = $Result.DefaultSelection<Prisma.$TeacherPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Course
 * 
 */
export type Course = $Result.DefaultSelection<Prisma.$CoursePayload>
/**
 * Model Subject
 * 
 */
export type Subject = $Result.DefaultSelection<Prisma.$SubjectPayload>
/**
 * Model AcademicYear
 * 
 */
export type AcademicYear = $Result.DefaultSelection<Prisma.$AcademicYearPayload>
/**
 * Model Enrollment
 * 
 */
export type Enrollment = $Result.DefaultSelection<Prisma.$EnrollmentPayload>
/**
 * Model SubjectAssignment
 * 
 */
export type SubjectAssignment = $Result.DefaultSelection<Prisma.$SubjectAssignmentPayload>
/**
 * Model Grade
 * 
 */
export type Grade = $Result.DefaultSelection<Prisma.$GradePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teachers
    * const teachers = await prisma.teacher.findMany()
    * ```
    */
  get teacher(): Prisma.TeacherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.course`: Exposes CRUD operations for the **Course** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Courses
    * const courses = await prisma.course.findMany()
    * ```
    */
  get course(): Prisma.CourseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subject`: Exposes CRUD operations for the **Subject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subjects
    * const subjects = await prisma.subject.findMany()
    * ```
    */
  get subject(): Prisma.SubjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.academicYear`: Exposes CRUD operations for the **AcademicYear** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AcademicYears
    * const academicYears = await prisma.academicYear.findMany()
    * ```
    */
  get academicYear(): Prisma.AcademicYearDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.enrollment`: Exposes CRUD operations for the **Enrollment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Enrollments
    * const enrollments = await prisma.enrollment.findMany()
    * ```
    */
  get enrollment(): Prisma.EnrollmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subjectAssignment`: Exposes CRUD operations for the **SubjectAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubjectAssignments
    * const subjectAssignments = await prisma.subjectAssignment.findMany()
    * ```
    */
  get subjectAssignment(): Prisma.SubjectAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.grade`: Exposes CRUD operations for the **Grade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Grades
    * const grades = await prisma.grade.findMany()
    * ```
    */
  get grade(): Prisma.GradeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Teacher: 'Teacher',
    Student: 'Student',
    Course: 'Course',
    Subject: 'Subject',
    AcademicYear: 'AcademicYear',
    Enrollment: 'Enrollment',
    SubjectAssignment: 'SubjectAssignment',
    Grade: 'Grade'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "teacher" | "student" | "course" | "subject" | "academicYear" | "enrollment" | "subjectAssignment" | "grade"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Teacher: {
        payload: Prisma.$TeacherPayload<ExtArgs>
        fields: Prisma.TeacherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeacherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeacherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findFirst: {
            args: Prisma.TeacherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeacherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findMany: {
            args: Prisma.TeacherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          create: {
            args: Prisma.TeacherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          createMany: {
            args: Prisma.TeacherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeacherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          delete: {
            args: Prisma.TeacherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          update: {
            args: Prisma.TeacherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          deleteMany: {
            args: Prisma.TeacherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeacherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeacherUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          upsert: {
            args: Prisma.TeacherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          aggregate: {
            args: Prisma.TeacherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeacher>
          }
          groupBy: {
            args: Prisma.TeacherGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeacherGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeacherCountArgs<ExtArgs>
            result: $Utils.Optional<TeacherCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Course: {
        payload: Prisma.$CoursePayload<ExtArgs>
        fields: Prisma.CourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CourseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findFirst: {
            args: Prisma.CourseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          findMany: {
            args: Prisma.CourseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          create: {
            args: Prisma.CourseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          createMany: {
            args: Prisma.CourseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          delete: {
            args: Prisma.CourseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          update: {
            args: Prisma.CourseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          deleteMany: {
            args: Prisma.CourseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CourseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>[]
          }
          upsert: {
            args: Prisma.CourseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CoursePayload>
          }
          aggregate: {
            args: Prisma.CourseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCourse>
          }
          groupBy: {
            args: Prisma.CourseGroupByArgs<ExtArgs>
            result: $Utils.Optional<CourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CourseCountArgs<ExtArgs>
            result: $Utils.Optional<CourseCountAggregateOutputType> | number
          }
        }
      }
      Subject: {
        payload: Prisma.$SubjectPayload<ExtArgs>
        fields: Prisma.SubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findFirst: {
            args: Prisma.SubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findMany: {
            args: Prisma.SubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          create: {
            args: Prisma.SubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          createMany: {
            args: Prisma.SubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          delete: {
            args: Prisma.SubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          update: {
            args: Prisma.SubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          deleteMany: {
            args: Prisma.SubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          upsert: {
            args: Prisma.SubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          aggregate: {
            args: Prisma.SubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubject>
          }
          groupBy: {
            args: Prisma.SubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubjectCountArgs<ExtArgs>
            result: $Utils.Optional<SubjectCountAggregateOutputType> | number
          }
        }
      }
      AcademicYear: {
        payload: Prisma.$AcademicYearPayload<ExtArgs>
        fields: Prisma.AcademicYearFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AcademicYearFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AcademicYearFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>
          }
          findFirst: {
            args: Prisma.AcademicYearFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AcademicYearFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>
          }
          findMany: {
            args: Prisma.AcademicYearFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>[]
          }
          create: {
            args: Prisma.AcademicYearCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>
          }
          createMany: {
            args: Prisma.AcademicYearCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AcademicYearCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>[]
          }
          delete: {
            args: Prisma.AcademicYearDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>
          }
          update: {
            args: Prisma.AcademicYearUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>
          }
          deleteMany: {
            args: Prisma.AcademicYearDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AcademicYearUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AcademicYearUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>[]
          }
          upsert: {
            args: Prisma.AcademicYearUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AcademicYearPayload>
          }
          aggregate: {
            args: Prisma.AcademicYearAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAcademicYear>
          }
          groupBy: {
            args: Prisma.AcademicYearGroupByArgs<ExtArgs>
            result: $Utils.Optional<AcademicYearGroupByOutputType>[]
          }
          count: {
            args: Prisma.AcademicYearCountArgs<ExtArgs>
            result: $Utils.Optional<AcademicYearCountAggregateOutputType> | number
          }
        }
      }
      Enrollment: {
        payload: Prisma.$EnrollmentPayload<ExtArgs>
        fields: Prisma.EnrollmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EnrollmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EnrollmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findFirst: {
            args: Prisma.EnrollmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EnrollmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          findMany: {
            args: Prisma.EnrollmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          create: {
            args: Prisma.EnrollmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          createMany: {
            args: Prisma.EnrollmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EnrollmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          delete: {
            args: Prisma.EnrollmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          update: {
            args: Prisma.EnrollmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          deleteMany: {
            args: Prisma.EnrollmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EnrollmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EnrollmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>[]
          }
          upsert: {
            args: Prisma.EnrollmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EnrollmentPayload>
          }
          aggregate: {
            args: Prisma.EnrollmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEnrollment>
          }
          groupBy: {
            args: Prisma.EnrollmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EnrollmentCountArgs<ExtArgs>
            result: $Utils.Optional<EnrollmentCountAggregateOutputType> | number
          }
        }
      }
      SubjectAssignment: {
        payload: Prisma.$SubjectAssignmentPayload<ExtArgs>
        fields: Prisma.SubjectAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubjectAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubjectAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectAssignmentPayload>
          }
          findFirst: {
            args: Prisma.SubjectAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubjectAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectAssignmentPayload>
          }
          findMany: {
            args: Prisma.SubjectAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectAssignmentPayload>[]
          }
          create: {
            args: Prisma.SubjectAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectAssignmentPayload>
          }
          createMany: {
            args: Prisma.SubjectAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubjectAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectAssignmentPayload>[]
          }
          delete: {
            args: Prisma.SubjectAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectAssignmentPayload>
          }
          update: {
            args: Prisma.SubjectAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.SubjectAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubjectAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubjectAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.SubjectAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectAssignmentPayload>
          }
          aggregate: {
            args: Prisma.SubjectAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubjectAssignment>
          }
          groupBy: {
            args: Prisma.SubjectAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubjectAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubjectAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<SubjectAssignmentCountAggregateOutputType> | number
          }
        }
      }
      Grade: {
        payload: Prisma.$GradePayload<ExtArgs>
        fields: Prisma.GradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          findFirst: {
            args: Prisma.GradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          findMany: {
            args: Prisma.GradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>[]
          }
          create: {
            args: Prisma.GradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          createMany: {
            args: Prisma.GradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>[]
          }
          delete: {
            args: Prisma.GradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          update: {
            args: Prisma.GradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          deleteMany: {
            args: Prisma.GradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GradeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>[]
          }
          upsert: {
            args: Prisma.GradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          aggregate: {
            args: Prisma.GradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGrade>
          }
          groupBy: {
            args: Prisma.GradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<GradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.GradeCountArgs<ExtArgs>
            result: $Utils.Optional<GradeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    teacher?: TeacherOmit
    student?: StudentOmit
    course?: CourseOmit
    subject?: SubjectOmit
    academicYear?: AcademicYearOmit
    enrollment?: EnrollmentOmit
    subjectAssignment?: SubjectAssignmentOmit
    grade?: GradeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TeacherCountOutputType
   */

  export type TeacherCountOutputType = {
    assignments: number
  }

  export type TeacherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | TeacherCountOutputTypeCountAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherCountOutputType
     */
    select?: TeacherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectAssignmentWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    enrollments: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | StudentCountOutputTypeCountEnrollmentsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }


  /**
   * Count Type CourseCountOutputType
   */

  export type CourseCountOutputType = {
    enrollments: number
    assignments: number
  }

  export type CourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | CourseCountOutputTypeCountEnrollmentsArgs
    assignments?: boolean | CourseCountOutputTypeCountAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CourseCountOutputType
     */
    select?: CourseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * CourseCountOutputType without action
   */
  export type CourseCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectAssignmentWhereInput
  }


  /**
   * Count Type SubjectCountOutputType
   */

  export type SubjectCountOutputType = {
    assignments: number
    grades: number
  }

  export type SubjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | SubjectCountOutputTypeCountAssignmentsArgs
    grades?: boolean | SubjectCountOutputTypeCountGradesArgs
  }

  // Custom InputTypes
  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectCountOutputType
     */
    select?: SubjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectAssignmentWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountGradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GradeWhereInput
  }


  /**
   * Count Type AcademicYearCountOutputType
   */

  export type AcademicYearCountOutputType = {
    enrollments: number
    assignments: number
  }

  export type AcademicYearCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | AcademicYearCountOutputTypeCountEnrollmentsArgs
    assignments?: boolean | AcademicYearCountOutputTypeCountAssignmentsArgs
  }

  // Custom InputTypes
  /**
   * AcademicYearCountOutputType without action
   */
  export type AcademicYearCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYearCountOutputType
     */
    select?: AcademicYearCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AcademicYearCountOutputType without action
   */
  export type AcademicYearCountOutputTypeCountEnrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
  }

  /**
   * AcademicYearCountOutputType without action
   */
  export type AcademicYearCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectAssignmentWhereInput
  }


  /**
   * Count Type EnrollmentCountOutputType
   */

  export type EnrollmentCountOutputType = {
    grades: number
  }

  export type EnrollmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    grades?: boolean | EnrollmentCountOutputTypeCountGradesArgs
  }

  // Custom InputTypes
  /**
   * EnrollmentCountOutputType without action
   */
  export type EnrollmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EnrollmentCountOutputType
     */
    select?: EnrollmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EnrollmentCountOutputType without action
   */
  export type EnrollmentCountOutputTypeCountGradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GradeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    role: $Enums.Role
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    teacher?: boolean | User$teacherArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "role" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | User$teacherArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      teacher: Prisma.$TeacherPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      role: $Enums.Role
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends User$teacherArgs<ExtArgs> = {}>(args?: Subset<T, User$teacherArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.teacher
   */
  export type User$teacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Teacher
   */

  export type AggregateTeacher = {
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  export type TeacherAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TeacherSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TeacherMinAggregateOutputType = {
    id: number | null
    userId: number | null
    firstName: string | null
    lastName: string | null
  }

  export type TeacherMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    firstName: string | null
    lastName: string | null
  }

  export type TeacherCountAggregateOutputType = {
    id: number
    userId: number
    firstName: number
    lastName: number
    _all: number
  }


  export type TeacherAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TeacherSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TeacherMinAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
  }

  export type TeacherMaxAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
  }

  export type TeacherCountAggregateInputType = {
    id?: true
    userId?: true
    firstName?: true
    lastName?: true
    _all?: true
  }

  export type TeacherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teacher to aggregate.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teachers
    **/
    _count?: true | TeacherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeacherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeacherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeacherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeacherMaxAggregateInputType
  }

  export type GetTeacherAggregateType<T extends TeacherAggregateArgs> = {
        [P in keyof T & keyof AggregateTeacher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeacher[P]>
      : GetScalarType<T[P], AggregateTeacher[P]>
  }




  export type TeacherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithAggregationInput | TeacherOrderByWithAggregationInput[]
    by: TeacherScalarFieldEnum[] | TeacherScalarFieldEnum
    having?: TeacherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeacherCountAggregateInputType | true
    _avg?: TeacherAvgAggregateInputType
    _sum?: TeacherSumAggregateInputType
    _min?: TeacherMinAggregateInputType
    _max?: TeacherMaxAggregateInputType
  }

  export type TeacherGroupByOutputType = {
    id: number
    userId: number
    firstName: string
    lastName: string
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  type GetTeacherGroupByPayload<T extends TeacherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeacherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeacherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeacherGroupByOutputType[P]>
            : GetScalarType<T[P], TeacherGroupByOutputType[P]>
        }
      >
    >


  export type TeacherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    assignments?: boolean | Teacher$assignmentsArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectScalar = {
    id?: boolean
    userId?: boolean
    firstName?: boolean
    lastName?: boolean
  }

  export type TeacherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "firstName" | "lastName", ExtArgs["result"]["teacher"]>
  export type TeacherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    assignments?: boolean | Teacher$assignmentsArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeacherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TeacherIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TeacherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Teacher"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      assignments: Prisma.$SubjectAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      firstName: string
      lastName: string
    }, ExtArgs["result"]["teacher"]>
    composites: {}
  }

  type TeacherGetPayload<S extends boolean | null | undefined | TeacherDefaultArgs> = $Result.GetResult<Prisma.$TeacherPayload, S>

  type TeacherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeacherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeacherCountAggregateInputType | true
    }

  export interface TeacherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Teacher'], meta: { name: 'Teacher' } }
    /**
     * Find zero or one Teacher that matches the filter.
     * @param {TeacherFindUniqueArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeacherFindUniqueArgs>(args: SelectSubset<T, TeacherFindUniqueArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Teacher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeacherFindUniqueOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeacherFindUniqueOrThrowArgs>(args: SelectSubset<T, TeacherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeacherFindFirstArgs>(args?: SelectSubset<T, TeacherFindFirstArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeacherFindFirstOrThrowArgs>(args?: SelectSubset<T, TeacherFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teachers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teachers
     * const teachers = await prisma.teacher.findMany()
     * 
     * // Get first 10 Teachers
     * const teachers = await prisma.teacher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teacherWithIdOnly = await prisma.teacher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeacherFindManyArgs>(args?: SelectSubset<T, TeacherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Teacher.
     * @param {TeacherCreateArgs} args - Arguments to create a Teacher.
     * @example
     * // Create one Teacher
     * const Teacher = await prisma.teacher.create({
     *   data: {
     *     // ... data to create a Teacher
     *   }
     * })
     * 
     */
    create<T extends TeacherCreateArgs>(args: SelectSubset<T, TeacherCreateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teachers.
     * @param {TeacherCreateManyArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeacherCreateManyArgs>(args?: SelectSubset<T, TeacherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teachers and returns the data saved in the database.
     * @param {TeacherCreateManyAndReturnArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeacherCreateManyAndReturnArgs>(args?: SelectSubset<T, TeacherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Teacher.
     * @param {TeacherDeleteArgs} args - Arguments to delete one Teacher.
     * @example
     * // Delete one Teacher
     * const Teacher = await prisma.teacher.delete({
     *   where: {
     *     // ... filter to delete one Teacher
     *   }
     * })
     * 
     */
    delete<T extends TeacherDeleteArgs>(args: SelectSubset<T, TeacherDeleteArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Teacher.
     * @param {TeacherUpdateArgs} args - Arguments to update one Teacher.
     * @example
     * // Update one Teacher
     * const teacher = await prisma.teacher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeacherUpdateArgs>(args: SelectSubset<T, TeacherUpdateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teachers.
     * @param {TeacherDeleteManyArgs} args - Arguments to filter Teachers to delete.
     * @example
     * // Delete a few Teachers
     * const { count } = await prisma.teacher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeacherDeleteManyArgs>(args?: SelectSubset<T, TeacherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeacherUpdateManyArgs>(args: SelectSubset<T, TeacherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers and returns the data updated in the database.
     * @param {TeacherUpdateManyAndReturnArgs} args - Arguments to update many Teachers.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeacherUpdateManyAndReturnArgs>(args: SelectSubset<T, TeacherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Teacher.
     * @param {TeacherUpsertArgs} args - Arguments to update or create a Teacher.
     * @example
     * // Update or create a Teacher
     * const teacher = await prisma.teacher.upsert({
     *   create: {
     *     // ... data to create a Teacher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teacher we want to update
     *   }
     * })
     */
    upsert<T extends TeacherUpsertArgs>(args: SelectSubset<T, TeacherUpsertArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherCountArgs} args - Arguments to filter Teachers to count.
     * @example
     * // Count the number of Teachers
     * const count = await prisma.teacher.count({
     *   where: {
     *     // ... the filter for the Teachers we want to count
     *   }
     * })
    **/
    count<T extends TeacherCountArgs>(
      args?: Subset<T, TeacherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeacherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeacherAggregateArgs>(args: Subset<T, TeacherAggregateArgs>): Prisma.PrismaPromise<GetTeacherAggregateType<T>>

    /**
     * Group by Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeacherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeacherGroupByArgs['orderBy'] }
        : { orderBy?: TeacherGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeacherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Teacher model
   */
  readonly fields: TeacherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Teacher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeacherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    assignments<T extends Teacher$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Teacher model
   */
  interface TeacherFieldRefs {
    readonly id: FieldRef<"Teacher", 'Int'>
    readonly userId: FieldRef<"Teacher", 'Int'>
    readonly firstName: FieldRef<"Teacher", 'String'>
    readonly lastName: FieldRef<"Teacher", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Teacher findUnique
   */
  export type TeacherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findUniqueOrThrow
   */
  export type TeacherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findFirst
   */
  export type TeacherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findFirstOrThrow
   */
  export type TeacherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findMany
   */
  export type TeacherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teachers to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher create
   */
  export type TeacherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to create a Teacher.
     */
    data: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
  }

  /**
   * Teacher createMany
   */
  export type TeacherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher createManyAndReturn
   */
  export type TeacherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Teacher update
   */
  export type TeacherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to update a Teacher.
     */
    data: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
    /**
     * Choose, which Teacher to update.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher updateMany
   */
  export type TeacherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher updateManyAndReturn
   */
  export type TeacherUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Teacher upsert
   */
  export type TeacherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The filter to search for the Teacher to update in case it exists.
     */
    where: TeacherWhereUniqueInput
    /**
     * In case the Teacher found by the `where` argument doesn't exist, create a new Teacher with this data.
     */
    create: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
    /**
     * In case the Teacher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
  }

  /**
   * Teacher delete
   */
  export type TeacherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter which Teacher to delete.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher deleteMany
   */
  export type TeacherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teachers to delete
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to delete.
     */
    limit?: number
  }

  /**
   * Teacher.assignments
   */
  export type Teacher$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    where?: SubjectAssignmentWhereInput
    orderBy?: SubjectAssignmentOrderByWithRelationInput | SubjectAssignmentOrderByWithRelationInput[]
    cursor?: SubjectAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubjectAssignmentScalarFieldEnum | SubjectAssignmentScalarFieldEnum[]
  }

  /**
   * Teacher without action
   */
  export type TeacherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    id: number | null
  }

  export type StudentSumAggregateOutputType = {
    id: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: number | null
    rude: string | null
    firstName: string | null
    lastName: string | null
    birthDate: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    id: number | null
    rude: string | null
    firstName: string | null
    lastName: string | null
    birthDate: Date | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    rude: number
    firstName: number
    lastName: number
    birthDate: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    id?: true
  }

  export type StudentSumAggregateInputType = {
    id?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    rude?: true
    firstName?: true
    lastName?: true
    birthDate?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    rude?: true
    firstName?: true
    lastName?: true
    birthDate?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    rude?: true
    firstName?: true
    lastName?: true
    birthDate?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: number
    rude: string
    firstName: string
    lastName: string
    birthDate: Date | null
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rude?: boolean
    firstName?: boolean
    lastName?: boolean
    birthDate?: boolean
    enrollments?: boolean | Student$enrollmentsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rude?: boolean
    firstName?: boolean
    lastName?: boolean
    birthDate?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rude?: boolean
    firstName?: boolean
    lastName?: boolean
    birthDate?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    rude?: boolean
    firstName?: boolean
    lastName?: boolean
    birthDate?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rude" | "firstName" | "lastName" | "birthDate", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | Student$enrollmentsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      rude: string
      firstName: string
      lastName: string
      birthDate: Date | null
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enrollments<T extends Student$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Student$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'Int'>
    readonly rude: FieldRef<"Student", 'String'>
    readonly firstName: FieldRef<"Student", 'String'>
    readonly lastName: FieldRef<"Student", 'String'>
    readonly birthDate: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student updateManyAndReturn
   */
  export type StudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.enrollments
   */
  export type Student$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Course
   */

  export type AggregateCourse = {
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  export type CourseAvgAggregateOutputType = {
    id: number | null
  }

  export type CourseSumAggregateOutputType = {
    id: number | null
  }

  export type CourseMinAggregateOutputType = {
    id: number | null
    level: string | null
    parallel: string | null
  }

  export type CourseMaxAggregateOutputType = {
    id: number | null
    level: string | null
    parallel: string | null
  }

  export type CourseCountAggregateOutputType = {
    id: number
    level: number
    parallel: number
    _all: number
  }


  export type CourseAvgAggregateInputType = {
    id?: true
  }

  export type CourseSumAggregateInputType = {
    id?: true
  }

  export type CourseMinAggregateInputType = {
    id?: true
    level?: true
    parallel?: true
  }

  export type CourseMaxAggregateInputType = {
    id?: true
    level?: true
    parallel?: true
  }

  export type CourseCountAggregateInputType = {
    id?: true
    level?: true
    parallel?: true
    _all?: true
  }

  export type CourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Course to aggregate.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Courses
    **/
    _count?: true | CourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CourseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CourseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CourseMaxAggregateInputType
  }

  export type GetCourseAggregateType<T extends CourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCourse[P]>
      : GetScalarType<T[P], AggregateCourse[P]>
  }




  export type CourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CourseWhereInput
    orderBy?: CourseOrderByWithAggregationInput | CourseOrderByWithAggregationInput[]
    by: CourseScalarFieldEnum[] | CourseScalarFieldEnum
    having?: CourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CourseCountAggregateInputType | true
    _avg?: CourseAvgAggregateInputType
    _sum?: CourseSumAggregateInputType
    _min?: CourseMinAggregateInputType
    _max?: CourseMaxAggregateInputType
  }

  export type CourseGroupByOutputType = {
    id: number
    level: string
    parallel: string
    _count: CourseCountAggregateOutputType | null
    _avg: CourseAvgAggregateOutputType | null
    _sum: CourseSumAggregateOutputType | null
    _min: CourseMinAggregateOutputType | null
    _max: CourseMaxAggregateOutputType | null
  }

  type GetCourseGroupByPayload<T extends CourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CourseGroupByOutputType[P]>
            : GetScalarType<T[P], CourseGroupByOutputType[P]>
        }
      >
    >


  export type CourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    parallel?: boolean
    enrollments?: boolean | Course$enrollmentsArgs<ExtArgs>
    assignments?: boolean | Course$assignmentsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["course"]>

  export type CourseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    parallel?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    parallel?: boolean
  }, ExtArgs["result"]["course"]>

  export type CourseSelectScalar = {
    id?: boolean
    level?: boolean
    parallel?: boolean
  }

  export type CourseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "level" | "parallel", ExtArgs["result"]["course"]>
  export type CourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | Course$enrollmentsArgs<ExtArgs>
    assignments?: boolean | Course$assignmentsArgs<ExtArgs>
    _count?: boolean | CourseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CourseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CourseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Course"
    objects: {
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      assignments: Prisma.$SubjectAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      level: string
      parallel: string
    }, ExtArgs["result"]["course"]>
    composites: {}
  }

  type CourseGetPayload<S extends boolean | null | undefined | CourseDefaultArgs> = $Result.GetResult<Prisma.$CoursePayload, S>

  type CourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CourseCountAggregateInputType | true
    }

  export interface CourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Course'], meta: { name: 'Course' } }
    /**
     * Find zero or one Course that matches the filter.
     * @param {CourseFindUniqueArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CourseFindUniqueArgs>(args: SelectSubset<T, CourseFindUniqueArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Course that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CourseFindUniqueOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CourseFindUniqueOrThrowArgs>(args: SelectSubset<T, CourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CourseFindFirstArgs>(args?: SelectSubset<T, CourseFindFirstArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Course that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindFirstOrThrowArgs} args - Arguments to find a Course
     * @example
     * // Get one Course
     * const course = await prisma.course.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CourseFindFirstOrThrowArgs>(args?: SelectSubset<T, CourseFindFirstOrThrowArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Courses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Courses
     * const courses = await prisma.course.findMany()
     * 
     * // Get first 10 Courses
     * const courses = await prisma.course.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const courseWithIdOnly = await prisma.course.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CourseFindManyArgs>(args?: SelectSubset<T, CourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Course.
     * @param {CourseCreateArgs} args - Arguments to create a Course.
     * @example
     * // Create one Course
     * const Course = await prisma.course.create({
     *   data: {
     *     // ... data to create a Course
     *   }
     * })
     * 
     */
    create<T extends CourseCreateArgs>(args: SelectSubset<T, CourseCreateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Courses.
     * @param {CourseCreateManyArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CourseCreateManyArgs>(args?: SelectSubset<T, CourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Courses and returns the data saved in the database.
     * @param {CourseCreateManyAndReturnArgs} args - Arguments to create many Courses.
     * @example
     * // Create many Courses
     * const course = await prisma.course.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CourseCreateManyAndReturnArgs>(args?: SelectSubset<T, CourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Course.
     * @param {CourseDeleteArgs} args - Arguments to delete one Course.
     * @example
     * // Delete one Course
     * const Course = await prisma.course.delete({
     *   where: {
     *     // ... filter to delete one Course
     *   }
     * })
     * 
     */
    delete<T extends CourseDeleteArgs>(args: SelectSubset<T, CourseDeleteArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Course.
     * @param {CourseUpdateArgs} args - Arguments to update one Course.
     * @example
     * // Update one Course
     * const course = await prisma.course.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CourseUpdateArgs>(args: SelectSubset<T, CourseUpdateArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Courses.
     * @param {CourseDeleteManyArgs} args - Arguments to filter Courses to delete.
     * @example
     * // Delete a few Courses
     * const { count } = await prisma.course.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CourseDeleteManyArgs>(args?: SelectSubset<T, CourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CourseUpdateManyArgs>(args: SelectSubset<T, CourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Courses and returns the data updated in the database.
     * @param {CourseUpdateManyAndReturnArgs} args - Arguments to update many Courses.
     * @example
     * // Update many Courses
     * const course = await prisma.course.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Courses and only return the `id`
     * const courseWithIdOnly = await prisma.course.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CourseUpdateManyAndReturnArgs>(args: SelectSubset<T, CourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Course.
     * @param {CourseUpsertArgs} args - Arguments to update or create a Course.
     * @example
     * // Update or create a Course
     * const course = await prisma.course.upsert({
     *   create: {
     *     // ... data to create a Course
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Course we want to update
     *   }
     * })
     */
    upsert<T extends CourseUpsertArgs>(args: SelectSubset<T, CourseUpsertArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Courses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseCountArgs} args - Arguments to filter Courses to count.
     * @example
     * // Count the number of Courses
     * const count = await prisma.course.count({
     *   where: {
     *     // ... the filter for the Courses we want to count
     *   }
     * })
    **/
    count<T extends CourseCountArgs>(
      args?: Subset<T, CourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CourseAggregateArgs>(args: Subset<T, CourseAggregateArgs>): Prisma.PrismaPromise<GetCourseAggregateType<T>>

    /**
     * Group by Course.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CourseGroupByArgs['orderBy'] }
        : { orderBy?: CourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Course model
   */
  readonly fields: CourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Course.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enrollments<T extends Course$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, Course$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignments<T extends Course$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Course$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Course model
   */
  interface CourseFieldRefs {
    readonly id: FieldRef<"Course", 'Int'>
    readonly level: FieldRef<"Course", 'String'>
    readonly parallel: FieldRef<"Course", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Course findUnique
   */
  export type CourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findUniqueOrThrow
   */
  export type CourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course findFirst
   */
  export type CourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findFirstOrThrow
   */
  export type CourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Course to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course findMany
   */
  export type CourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter, which Courses to fetch.
     */
    where?: CourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Courses to fetch.
     */
    orderBy?: CourseOrderByWithRelationInput | CourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Courses.
     */
    cursor?: CourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Courses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Courses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Courses.
     */
    distinct?: CourseScalarFieldEnum | CourseScalarFieldEnum[]
  }

  /**
   * Course create
   */
  export type CourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to create a Course.
     */
    data: XOR<CourseCreateInput, CourseUncheckedCreateInput>
  }

  /**
   * Course createMany
   */
  export type CourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course createManyAndReturn
   */
  export type CourseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to create many Courses.
     */
    data: CourseCreateManyInput | CourseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Course update
   */
  export type CourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The data needed to update a Course.
     */
    data: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
    /**
     * Choose, which Course to update.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course updateMany
   */
  export type CourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course updateManyAndReturn
   */
  export type CourseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * The data used to update Courses.
     */
    data: XOR<CourseUpdateManyMutationInput, CourseUncheckedUpdateManyInput>
    /**
     * Filter which Courses to update
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to update.
     */
    limit?: number
  }

  /**
   * Course upsert
   */
  export type CourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * The filter to search for the Course to update in case it exists.
     */
    where: CourseWhereUniqueInput
    /**
     * In case the Course found by the `where` argument doesn't exist, create a new Course with this data.
     */
    create: XOR<CourseCreateInput, CourseUncheckedCreateInput>
    /**
     * In case the Course was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CourseUpdateInput, CourseUncheckedUpdateInput>
  }

  /**
   * Course delete
   */
  export type CourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
    /**
     * Filter which Course to delete.
     */
    where: CourseWhereUniqueInput
  }

  /**
   * Course deleteMany
   */
  export type CourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Courses to delete
     */
    where?: CourseWhereInput
    /**
     * Limit how many Courses to delete.
     */
    limit?: number
  }

  /**
   * Course.enrollments
   */
  export type Course$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Course.assignments
   */
  export type Course$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    where?: SubjectAssignmentWhereInput
    orderBy?: SubjectAssignmentOrderByWithRelationInput | SubjectAssignmentOrderByWithRelationInput[]
    cursor?: SubjectAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubjectAssignmentScalarFieldEnum | SubjectAssignmentScalarFieldEnum[]
  }

  /**
   * Course without action
   */
  export type CourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Course
     */
    select?: CourseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Course
     */
    omit?: CourseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CourseInclude<ExtArgs> | null
  }


  /**
   * Model Subject
   */

  export type AggregateSubject = {
    _count: SubjectCountAggregateOutputType | null
    _avg: SubjectAvgAggregateOutputType | null
    _sum: SubjectSumAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  export type SubjectAvgAggregateOutputType = {
    id: number | null
  }

  export type SubjectSumAggregateOutputType = {
    id: number | null
  }

  export type SubjectMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type SubjectMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type SubjectCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type SubjectAvgAggregateInputType = {
    id?: true
  }

  export type SubjectSumAggregateInputType = {
    id?: true
  }

  export type SubjectMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type SubjectMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type SubjectCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type SubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subject to aggregate.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subjects
    **/
    _count?: true | SubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubjectMaxAggregateInputType
  }

  export type GetSubjectAggregateType<T extends SubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubject[P]>
      : GetScalarType<T[P], AggregateSubject[P]>
  }




  export type SubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithAggregationInput | SubjectOrderByWithAggregationInput[]
    by: SubjectScalarFieldEnum[] | SubjectScalarFieldEnum
    having?: SubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubjectCountAggregateInputType | true
    _avg?: SubjectAvgAggregateInputType
    _sum?: SubjectSumAggregateInputType
    _min?: SubjectMinAggregateInputType
    _max?: SubjectMaxAggregateInputType
  }

  export type SubjectGroupByOutputType = {
    id: number
    name: string
    _count: SubjectCountAggregateOutputType | null
    _avg: SubjectAvgAggregateOutputType | null
    _sum: SubjectSumAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  type GetSubjectGroupByPayload<T extends SubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubjectGroupByOutputType[P]>
            : GetScalarType<T[P], SubjectGroupByOutputType[P]>
        }
      >
    >


  export type SubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    assignments?: boolean | Subject$assignmentsArgs<ExtArgs>
    grades?: boolean | Subject$gradesArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type SubjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["subject"]>
  export type SubjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | Subject$assignmentsArgs<ExtArgs>
    grades?: boolean | Subject$gradesArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SubjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subject"
    objects: {
      assignments: Prisma.$SubjectAssignmentPayload<ExtArgs>[]
      grades: Prisma.$GradePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["subject"]>
    composites: {}
  }

  type SubjectGetPayload<S extends boolean | null | undefined | SubjectDefaultArgs> = $Result.GetResult<Prisma.$SubjectPayload, S>

  type SubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubjectCountAggregateInputType | true
    }

  export interface SubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subject'], meta: { name: 'Subject' } }
    /**
     * Find zero or one Subject that matches the filter.
     * @param {SubjectFindUniqueArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectFindUniqueArgs>(args: SelectSubset<T, SubjectFindUniqueArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectFindUniqueOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, SubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectFindFirstArgs>(args?: SelectSubset<T, SubjectFindFirstArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, SubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subjects
     * const subjects = await prisma.subject.findMany()
     * 
     * // Get first 10 Subjects
     * const subjects = await prisma.subject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subjectWithIdOnly = await prisma.subject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubjectFindManyArgs>(args?: SelectSubset<T, SubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subject.
     * @param {SubjectCreateArgs} args - Arguments to create a Subject.
     * @example
     * // Create one Subject
     * const Subject = await prisma.subject.create({
     *   data: {
     *     // ... data to create a Subject
     *   }
     * })
     * 
     */
    create<T extends SubjectCreateArgs>(args: SelectSubset<T, SubjectCreateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subjects.
     * @param {SubjectCreateManyArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubjectCreateManyArgs>(args?: SelectSubset<T, SubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subjects and returns the data saved in the database.
     * @param {SubjectCreateManyAndReturnArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, SubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subject.
     * @param {SubjectDeleteArgs} args - Arguments to delete one Subject.
     * @example
     * // Delete one Subject
     * const Subject = await prisma.subject.delete({
     *   where: {
     *     // ... filter to delete one Subject
     *   }
     * })
     * 
     */
    delete<T extends SubjectDeleteArgs>(args: SelectSubset<T, SubjectDeleteArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subject.
     * @param {SubjectUpdateArgs} args - Arguments to update one Subject.
     * @example
     * // Update one Subject
     * const subject = await prisma.subject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubjectUpdateArgs>(args: SelectSubset<T, SubjectUpdateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subjects.
     * @param {SubjectDeleteManyArgs} args - Arguments to filter Subjects to delete.
     * @example
     * // Delete a few Subjects
     * const { count } = await prisma.subject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubjectDeleteManyArgs>(args?: SelectSubset<T, SubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubjectUpdateManyArgs>(args: SelectSubset<T, SubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects and returns the data updated in the database.
     * @param {SubjectUpdateManyAndReturnArgs} args - Arguments to update many Subjects.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubjectUpdateManyAndReturnArgs>(args: SelectSubset<T, SubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subject.
     * @param {SubjectUpsertArgs} args - Arguments to update or create a Subject.
     * @example
     * // Update or create a Subject
     * const subject = await prisma.subject.upsert({
     *   create: {
     *     // ... data to create a Subject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subject we want to update
     *   }
     * })
     */
    upsert<T extends SubjectUpsertArgs>(args: SelectSubset<T, SubjectUpsertArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectCountArgs} args - Arguments to filter Subjects to count.
     * @example
     * // Count the number of Subjects
     * const count = await prisma.subject.count({
     *   where: {
     *     // ... the filter for the Subjects we want to count
     *   }
     * })
    **/
    count<T extends SubjectCountArgs>(
      args?: Subset<T, SubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubjectAggregateArgs>(args: Subset<T, SubjectAggregateArgs>): Prisma.PrismaPromise<GetSubjectAggregateType<T>>

    /**
     * Group by Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubjectGroupByArgs['orderBy'] }
        : { orderBy?: SubjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subject model
   */
  readonly fields: SubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignments<T extends Subject$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Subject$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    grades<T extends Subject$gradesArgs<ExtArgs> = {}>(args?: Subset<T, Subject$gradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subject model
   */
  interface SubjectFieldRefs {
    readonly id: FieldRef<"Subject", 'Int'>
    readonly name: FieldRef<"Subject", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Subject findUnique
   */
  export type SubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findUniqueOrThrow
   */
  export type SubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findFirst
   */
  export type SubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findFirstOrThrow
   */
  export type SubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findMany
   */
  export type SubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subjects to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject create
   */
  export type SubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Subject.
     */
    data: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
  }

  /**
   * Subject createMany
   */
  export type SubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject createManyAndReturn
   */
  export type SubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject update
   */
  export type SubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Subject.
     */
    data: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
    /**
     * Choose, which Subject to update.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject updateMany
   */
  export type SubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject updateManyAndReturn
   */
  export type SubjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject upsert
   */
  export type SubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Subject to update in case it exists.
     */
    where: SubjectWhereUniqueInput
    /**
     * In case the Subject found by the `where` argument doesn't exist, create a new Subject with this data.
     */
    create: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
    /**
     * In case the Subject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
  }

  /**
   * Subject delete
   */
  export type SubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter which Subject to delete.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject deleteMany
   */
  export type SubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subjects to delete
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to delete.
     */
    limit?: number
  }

  /**
   * Subject.assignments
   */
  export type Subject$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    where?: SubjectAssignmentWhereInput
    orderBy?: SubjectAssignmentOrderByWithRelationInput | SubjectAssignmentOrderByWithRelationInput[]
    cursor?: SubjectAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubjectAssignmentScalarFieldEnum | SubjectAssignmentScalarFieldEnum[]
  }

  /**
   * Subject.grades
   */
  export type Subject$gradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    where?: GradeWhereInput
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    cursor?: GradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GradeScalarFieldEnum | GradeScalarFieldEnum[]
  }

  /**
   * Subject without action
   */
  export type SubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
  }


  /**
   * Model AcademicYear
   */

  export type AggregateAcademicYear = {
    _count: AcademicYearCountAggregateOutputType | null
    _avg: AcademicYearAvgAggregateOutputType | null
    _sum: AcademicYearSumAggregateOutputType | null
    _min: AcademicYearMinAggregateOutputType | null
    _max: AcademicYearMaxAggregateOutputType | null
  }

  export type AcademicYearAvgAggregateOutputType = {
    id: number | null
    year: number | null
  }

  export type AcademicYearSumAggregateOutputType = {
    id: number | null
    year: number | null
  }

  export type AcademicYearMinAggregateOutputType = {
    id: number | null
    year: number | null
  }

  export type AcademicYearMaxAggregateOutputType = {
    id: number | null
    year: number | null
  }

  export type AcademicYearCountAggregateOutputType = {
    id: number
    year: number
    _all: number
  }


  export type AcademicYearAvgAggregateInputType = {
    id?: true
    year?: true
  }

  export type AcademicYearSumAggregateInputType = {
    id?: true
    year?: true
  }

  export type AcademicYearMinAggregateInputType = {
    id?: true
    year?: true
  }

  export type AcademicYearMaxAggregateInputType = {
    id?: true
    year?: true
  }

  export type AcademicYearCountAggregateInputType = {
    id?: true
    year?: true
    _all?: true
  }

  export type AcademicYearAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicYear to aggregate.
     */
    where?: AcademicYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicYears to fetch.
     */
    orderBy?: AcademicYearOrderByWithRelationInput | AcademicYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AcademicYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AcademicYears
    **/
    _count?: true | AcademicYearCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AcademicYearAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AcademicYearSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AcademicYearMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AcademicYearMaxAggregateInputType
  }

  export type GetAcademicYearAggregateType<T extends AcademicYearAggregateArgs> = {
        [P in keyof T & keyof AggregateAcademicYear]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAcademicYear[P]>
      : GetScalarType<T[P], AggregateAcademicYear[P]>
  }




  export type AcademicYearGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AcademicYearWhereInput
    orderBy?: AcademicYearOrderByWithAggregationInput | AcademicYearOrderByWithAggregationInput[]
    by: AcademicYearScalarFieldEnum[] | AcademicYearScalarFieldEnum
    having?: AcademicYearScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AcademicYearCountAggregateInputType | true
    _avg?: AcademicYearAvgAggregateInputType
    _sum?: AcademicYearSumAggregateInputType
    _min?: AcademicYearMinAggregateInputType
    _max?: AcademicYearMaxAggregateInputType
  }

  export type AcademicYearGroupByOutputType = {
    id: number
    year: number
    _count: AcademicYearCountAggregateOutputType | null
    _avg: AcademicYearAvgAggregateOutputType | null
    _sum: AcademicYearSumAggregateOutputType | null
    _min: AcademicYearMinAggregateOutputType | null
    _max: AcademicYearMaxAggregateOutputType | null
  }

  type GetAcademicYearGroupByPayload<T extends AcademicYearGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AcademicYearGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AcademicYearGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AcademicYearGroupByOutputType[P]>
            : GetScalarType<T[P], AcademicYearGroupByOutputType[P]>
        }
      >
    >


  export type AcademicYearSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
    enrollments?: boolean | AcademicYear$enrollmentsArgs<ExtArgs>
    assignments?: boolean | AcademicYear$assignmentsArgs<ExtArgs>
    _count?: boolean | AcademicYearCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["academicYear"]>

  export type AcademicYearSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
  }, ExtArgs["result"]["academicYear"]>

  export type AcademicYearSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    year?: boolean
  }, ExtArgs["result"]["academicYear"]>

  export type AcademicYearSelectScalar = {
    id?: boolean
    year?: boolean
  }

  export type AcademicYearOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "year", ExtArgs["result"]["academicYear"]>
  export type AcademicYearInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollments?: boolean | AcademicYear$enrollmentsArgs<ExtArgs>
    assignments?: boolean | AcademicYear$assignmentsArgs<ExtArgs>
    _count?: boolean | AcademicYearCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AcademicYearIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AcademicYearIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AcademicYearPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AcademicYear"
    objects: {
      enrollments: Prisma.$EnrollmentPayload<ExtArgs>[]
      assignments: Prisma.$SubjectAssignmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      year: number
    }, ExtArgs["result"]["academicYear"]>
    composites: {}
  }

  type AcademicYearGetPayload<S extends boolean | null | undefined | AcademicYearDefaultArgs> = $Result.GetResult<Prisma.$AcademicYearPayload, S>

  type AcademicYearCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AcademicYearFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AcademicYearCountAggregateInputType | true
    }

  export interface AcademicYearDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AcademicYear'], meta: { name: 'AcademicYear' } }
    /**
     * Find zero or one AcademicYear that matches the filter.
     * @param {AcademicYearFindUniqueArgs} args - Arguments to find a AcademicYear
     * @example
     * // Get one AcademicYear
     * const academicYear = await prisma.academicYear.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AcademicYearFindUniqueArgs>(args: SelectSubset<T, AcademicYearFindUniqueArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AcademicYear that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AcademicYearFindUniqueOrThrowArgs} args - Arguments to find a AcademicYear
     * @example
     * // Get one AcademicYear
     * const academicYear = await prisma.academicYear.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AcademicYearFindUniqueOrThrowArgs>(args: SelectSubset<T, AcademicYearFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicYear that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearFindFirstArgs} args - Arguments to find a AcademicYear
     * @example
     * // Get one AcademicYear
     * const academicYear = await prisma.academicYear.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AcademicYearFindFirstArgs>(args?: SelectSubset<T, AcademicYearFindFirstArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AcademicYear that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearFindFirstOrThrowArgs} args - Arguments to find a AcademicYear
     * @example
     * // Get one AcademicYear
     * const academicYear = await prisma.academicYear.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AcademicYearFindFirstOrThrowArgs>(args?: SelectSubset<T, AcademicYearFindFirstOrThrowArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AcademicYears that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AcademicYears
     * const academicYears = await prisma.academicYear.findMany()
     * 
     * // Get first 10 AcademicYears
     * const academicYears = await prisma.academicYear.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const academicYearWithIdOnly = await prisma.academicYear.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AcademicYearFindManyArgs>(args?: SelectSubset<T, AcademicYearFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AcademicYear.
     * @param {AcademicYearCreateArgs} args - Arguments to create a AcademicYear.
     * @example
     * // Create one AcademicYear
     * const AcademicYear = await prisma.academicYear.create({
     *   data: {
     *     // ... data to create a AcademicYear
     *   }
     * })
     * 
     */
    create<T extends AcademicYearCreateArgs>(args: SelectSubset<T, AcademicYearCreateArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AcademicYears.
     * @param {AcademicYearCreateManyArgs} args - Arguments to create many AcademicYears.
     * @example
     * // Create many AcademicYears
     * const academicYear = await prisma.academicYear.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AcademicYearCreateManyArgs>(args?: SelectSubset<T, AcademicYearCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AcademicYears and returns the data saved in the database.
     * @param {AcademicYearCreateManyAndReturnArgs} args - Arguments to create many AcademicYears.
     * @example
     * // Create many AcademicYears
     * const academicYear = await prisma.academicYear.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AcademicYears and only return the `id`
     * const academicYearWithIdOnly = await prisma.academicYear.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AcademicYearCreateManyAndReturnArgs>(args?: SelectSubset<T, AcademicYearCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AcademicYear.
     * @param {AcademicYearDeleteArgs} args - Arguments to delete one AcademicYear.
     * @example
     * // Delete one AcademicYear
     * const AcademicYear = await prisma.academicYear.delete({
     *   where: {
     *     // ... filter to delete one AcademicYear
     *   }
     * })
     * 
     */
    delete<T extends AcademicYearDeleteArgs>(args: SelectSubset<T, AcademicYearDeleteArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AcademicYear.
     * @param {AcademicYearUpdateArgs} args - Arguments to update one AcademicYear.
     * @example
     * // Update one AcademicYear
     * const academicYear = await prisma.academicYear.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AcademicYearUpdateArgs>(args: SelectSubset<T, AcademicYearUpdateArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AcademicYears.
     * @param {AcademicYearDeleteManyArgs} args - Arguments to filter AcademicYears to delete.
     * @example
     * // Delete a few AcademicYears
     * const { count } = await prisma.academicYear.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AcademicYearDeleteManyArgs>(args?: SelectSubset<T, AcademicYearDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicYears.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AcademicYears
     * const academicYear = await prisma.academicYear.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AcademicYearUpdateManyArgs>(args: SelectSubset<T, AcademicYearUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AcademicYears and returns the data updated in the database.
     * @param {AcademicYearUpdateManyAndReturnArgs} args - Arguments to update many AcademicYears.
     * @example
     * // Update many AcademicYears
     * const academicYear = await prisma.academicYear.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AcademicYears and only return the `id`
     * const academicYearWithIdOnly = await prisma.academicYear.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AcademicYearUpdateManyAndReturnArgs>(args: SelectSubset<T, AcademicYearUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AcademicYear.
     * @param {AcademicYearUpsertArgs} args - Arguments to update or create a AcademicYear.
     * @example
     * // Update or create a AcademicYear
     * const academicYear = await prisma.academicYear.upsert({
     *   create: {
     *     // ... data to create a AcademicYear
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AcademicYear we want to update
     *   }
     * })
     */
    upsert<T extends AcademicYearUpsertArgs>(args: SelectSubset<T, AcademicYearUpsertArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AcademicYears.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearCountArgs} args - Arguments to filter AcademicYears to count.
     * @example
     * // Count the number of AcademicYears
     * const count = await prisma.academicYear.count({
     *   where: {
     *     // ... the filter for the AcademicYears we want to count
     *   }
     * })
    **/
    count<T extends AcademicYearCountArgs>(
      args?: Subset<T, AcademicYearCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AcademicYearCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AcademicYear.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AcademicYearAggregateArgs>(args: Subset<T, AcademicYearAggregateArgs>): Prisma.PrismaPromise<GetAcademicYearAggregateType<T>>

    /**
     * Group by AcademicYear.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AcademicYearGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AcademicYearGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AcademicYearGroupByArgs['orderBy'] }
        : { orderBy?: AcademicYearGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AcademicYearGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAcademicYearGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AcademicYear model
   */
  readonly fields: AcademicYearFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AcademicYear.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AcademicYearClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enrollments<T extends AcademicYear$enrollmentsArgs<ExtArgs> = {}>(args?: Subset<T, AcademicYear$enrollmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignments<T extends AcademicYear$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, AcademicYear$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AcademicYear model
   */
  interface AcademicYearFieldRefs {
    readonly id: FieldRef<"AcademicYear", 'Int'>
    readonly year: FieldRef<"AcademicYear", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AcademicYear findUnique
   */
  export type AcademicYearFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * Filter, which AcademicYear to fetch.
     */
    where: AcademicYearWhereUniqueInput
  }

  /**
   * AcademicYear findUniqueOrThrow
   */
  export type AcademicYearFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * Filter, which AcademicYear to fetch.
     */
    where: AcademicYearWhereUniqueInput
  }

  /**
   * AcademicYear findFirst
   */
  export type AcademicYearFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * Filter, which AcademicYear to fetch.
     */
    where?: AcademicYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicYears to fetch.
     */
    orderBy?: AcademicYearOrderByWithRelationInput | AcademicYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicYears.
     */
    cursor?: AcademicYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicYears.
     */
    distinct?: AcademicYearScalarFieldEnum | AcademicYearScalarFieldEnum[]
  }

  /**
   * AcademicYear findFirstOrThrow
   */
  export type AcademicYearFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * Filter, which AcademicYear to fetch.
     */
    where?: AcademicYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicYears to fetch.
     */
    orderBy?: AcademicYearOrderByWithRelationInput | AcademicYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AcademicYears.
     */
    cursor?: AcademicYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicYears.
     */
    distinct?: AcademicYearScalarFieldEnum | AcademicYearScalarFieldEnum[]
  }

  /**
   * AcademicYear findMany
   */
  export type AcademicYearFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * Filter, which AcademicYears to fetch.
     */
    where?: AcademicYearWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AcademicYears to fetch.
     */
    orderBy?: AcademicYearOrderByWithRelationInput | AcademicYearOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AcademicYears.
     */
    cursor?: AcademicYearWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AcademicYears from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AcademicYears.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AcademicYears.
     */
    distinct?: AcademicYearScalarFieldEnum | AcademicYearScalarFieldEnum[]
  }

  /**
   * AcademicYear create
   */
  export type AcademicYearCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * The data needed to create a AcademicYear.
     */
    data: XOR<AcademicYearCreateInput, AcademicYearUncheckedCreateInput>
  }

  /**
   * AcademicYear createMany
   */
  export type AcademicYearCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AcademicYears.
     */
    data: AcademicYearCreateManyInput | AcademicYearCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcademicYear createManyAndReturn
   */
  export type AcademicYearCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * The data used to create many AcademicYears.
     */
    data: AcademicYearCreateManyInput | AcademicYearCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AcademicYear update
   */
  export type AcademicYearUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * The data needed to update a AcademicYear.
     */
    data: XOR<AcademicYearUpdateInput, AcademicYearUncheckedUpdateInput>
    /**
     * Choose, which AcademicYear to update.
     */
    where: AcademicYearWhereUniqueInput
  }

  /**
   * AcademicYear updateMany
   */
  export type AcademicYearUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AcademicYears.
     */
    data: XOR<AcademicYearUpdateManyMutationInput, AcademicYearUncheckedUpdateManyInput>
    /**
     * Filter which AcademicYears to update
     */
    where?: AcademicYearWhereInput
    /**
     * Limit how many AcademicYears to update.
     */
    limit?: number
  }

  /**
   * AcademicYear updateManyAndReturn
   */
  export type AcademicYearUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * The data used to update AcademicYears.
     */
    data: XOR<AcademicYearUpdateManyMutationInput, AcademicYearUncheckedUpdateManyInput>
    /**
     * Filter which AcademicYears to update
     */
    where?: AcademicYearWhereInput
    /**
     * Limit how many AcademicYears to update.
     */
    limit?: number
  }

  /**
   * AcademicYear upsert
   */
  export type AcademicYearUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * The filter to search for the AcademicYear to update in case it exists.
     */
    where: AcademicYearWhereUniqueInput
    /**
     * In case the AcademicYear found by the `where` argument doesn't exist, create a new AcademicYear with this data.
     */
    create: XOR<AcademicYearCreateInput, AcademicYearUncheckedCreateInput>
    /**
     * In case the AcademicYear was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AcademicYearUpdateInput, AcademicYearUncheckedUpdateInput>
  }

  /**
   * AcademicYear delete
   */
  export type AcademicYearDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
    /**
     * Filter which AcademicYear to delete.
     */
    where: AcademicYearWhereUniqueInput
  }

  /**
   * AcademicYear deleteMany
   */
  export type AcademicYearDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AcademicYears to delete
     */
    where?: AcademicYearWhereInput
    /**
     * Limit how many AcademicYears to delete.
     */
    limit?: number
  }

  /**
   * AcademicYear.enrollments
   */
  export type AcademicYear$enrollmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    cursor?: EnrollmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * AcademicYear.assignments
   */
  export type AcademicYear$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    where?: SubjectAssignmentWhereInput
    orderBy?: SubjectAssignmentOrderByWithRelationInput | SubjectAssignmentOrderByWithRelationInput[]
    cursor?: SubjectAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubjectAssignmentScalarFieldEnum | SubjectAssignmentScalarFieldEnum[]
  }

  /**
   * AcademicYear without action
   */
  export type AcademicYearDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AcademicYear
     */
    select?: AcademicYearSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AcademicYear
     */
    omit?: AcademicYearOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AcademicYearInclude<ExtArgs> | null
  }


  /**
   * Model Enrollment
   */

  export type AggregateEnrollment = {
    _count: EnrollmentCountAggregateOutputType | null
    _avg: EnrollmentAvgAggregateOutputType | null
    _sum: EnrollmentSumAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  export type EnrollmentAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
    courseId: number | null
    academicYearId: number | null
  }

  export type EnrollmentSumAggregateOutputType = {
    id: number | null
    studentId: number | null
    courseId: number | null
    academicYearId: number | null
  }

  export type EnrollmentMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    courseId: number | null
    academicYearId: number | null
    createdAt: Date | null
  }

  export type EnrollmentMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    courseId: number | null
    academicYearId: number | null
    createdAt: Date | null
  }

  export type EnrollmentCountAggregateOutputType = {
    id: number
    studentId: number
    courseId: number
    academicYearId: number
    createdAt: number
    _all: number
  }


  export type EnrollmentAvgAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    academicYearId?: true
  }

  export type EnrollmentSumAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    academicYearId?: true
  }

  export type EnrollmentMinAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    academicYearId?: true
    createdAt?: true
  }

  export type EnrollmentMaxAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    academicYearId?: true
    createdAt?: true
  }

  export type EnrollmentCountAggregateInputType = {
    id?: true
    studentId?: true
    courseId?: true
    academicYearId?: true
    createdAt?: true
    _all?: true
  }

  export type EnrollmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollment to aggregate.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Enrollments
    **/
    _count?: true | EnrollmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EnrollmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EnrollmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EnrollmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EnrollmentMaxAggregateInputType
  }

  export type GetEnrollmentAggregateType<T extends EnrollmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEnrollment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEnrollment[P]>
      : GetScalarType<T[P], AggregateEnrollment[P]>
  }




  export type EnrollmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EnrollmentWhereInput
    orderBy?: EnrollmentOrderByWithAggregationInput | EnrollmentOrderByWithAggregationInput[]
    by: EnrollmentScalarFieldEnum[] | EnrollmentScalarFieldEnum
    having?: EnrollmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EnrollmentCountAggregateInputType | true
    _avg?: EnrollmentAvgAggregateInputType
    _sum?: EnrollmentSumAggregateInputType
    _min?: EnrollmentMinAggregateInputType
    _max?: EnrollmentMaxAggregateInputType
  }

  export type EnrollmentGroupByOutputType = {
    id: number
    studentId: number
    courseId: number
    academicYearId: number
    createdAt: Date
    _count: EnrollmentCountAggregateOutputType | null
    _avg: EnrollmentAvgAggregateOutputType | null
    _sum: EnrollmentSumAggregateOutputType | null
    _min: EnrollmentMinAggregateOutputType | null
    _max: EnrollmentMaxAggregateOutputType | null
  }

  type GetEnrollmentGroupByPayload<T extends EnrollmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EnrollmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EnrollmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
            : GetScalarType<T[P], EnrollmentGroupByOutputType[P]>
        }
      >
    >


  export type EnrollmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    academicYearId?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    academicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
    grades?: boolean | Enrollment$gradesArgs<ExtArgs>
    _count?: boolean | EnrollmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    academicYearId?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    academicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    academicYearId?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    academicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["enrollment"]>

  export type EnrollmentSelectScalar = {
    id?: boolean
    studentId?: boolean
    courseId?: boolean
    academicYearId?: boolean
    createdAt?: boolean
  }

  export type EnrollmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "courseId" | "academicYearId" | "createdAt", ExtArgs["result"]["enrollment"]>
  export type EnrollmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    academicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
    grades?: boolean | Enrollment$gradesArgs<ExtArgs>
    _count?: boolean | EnrollmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EnrollmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    academicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }
  export type EnrollmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    academicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }

  export type $EnrollmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Enrollment"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs>
      academicYear: Prisma.$AcademicYearPayload<ExtArgs>
      grades: Prisma.$GradePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      courseId: number
      academicYearId: number
      createdAt: Date
    }, ExtArgs["result"]["enrollment"]>
    composites: {}
  }

  type EnrollmentGetPayload<S extends boolean | null | undefined | EnrollmentDefaultArgs> = $Result.GetResult<Prisma.$EnrollmentPayload, S>

  type EnrollmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EnrollmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EnrollmentCountAggregateInputType | true
    }

  export interface EnrollmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Enrollment'], meta: { name: 'Enrollment' } }
    /**
     * Find zero or one Enrollment that matches the filter.
     * @param {EnrollmentFindUniqueArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EnrollmentFindUniqueArgs>(args: SelectSubset<T, EnrollmentFindUniqueArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Enrollment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EnrollmentFindUniqueOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EnrollmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EnrollmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EnrollmentFindFirstArgs>(args?: SelectSubset<T, EnrollmentFindFirstArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Enrollment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindFirstOrThrowArgs} args - Arguments to find a Enrollment
     * @example
     * // Get one Enrollment
     * const enrollment = await prisma.enrollment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EnrollmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EnrollmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Enrollments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Enrollments
     * const enrollments = await prisma.enrollment.findMany()
     * 
     * // Get first 10 Enrollments
     * const enrollments = await prisma.enrollment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EnrollmentFindManyArgs>(args?: SelectSubset<T, EnrollmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Enrollment.
     * @param {EnrollmentCreateArgs} args - Arguments to create a Enrollment.
     * @example
     * // Create one Enrollment
     * const Enrollment = await prisma.enrollment.create({
     *   data: {
     *     // ... data to create a Enrollment
     *   }
     * })
     * 
     */
    create<T extends EnrollmentCreateArgs>(args: SelectSubset<T, EnrollmentCreateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Enrollments.
     * @param {EnrollmentCreateManyArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EnrollmentCreateManyArgs>(args?: SelectSubset<T, EnrollmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Enrollments and returns the data saved in the database.
     * @param {EnrollmentCreateManyAndReturnArgs} args - Arguments to create many Enrollments.
     * @example
     * // Create many Enrollments
     * const enrollment = await prisma.enrollment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Enrollments and only return the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EnrollmentCreateManyAndReturnArgs>(args?: SelectSubset<T, EnrollmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Enrollment.
     * @param {EnrollmentDeleteArgs} args - Arguments to delete one Enrollment.
     * @example
     * // Delete one Enrollment
     * const Enrollment = await prisma.enrollment.delete({
     *   where: {
     *     // ... filter to delete one Enrollment
     *   }
     * })
     * 
     */
    delete<T extends EnrollmentDeleteArgs>(args: SelectSubset<T, EnrollmentDeleteArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Enrollment.
     * @param {EnrollmentUpdateArgs} args - Arguments to update one Enrollment.
     * @example
     * // Update one Enrollment
     * const enrollment = await prisma.enrollment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EnrollmentUpdateArgs>(args: SelectSubset<T, EnrollmentUpdateArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Enrollments.
     * @param {EnrollmentDeleteManyArgs} args - Arguments to filter Enrollments to delete.
     * @example
     * // Delete a few Enrollments
     * const { count } = await prisma.enrollment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EnrollmentDeleteManyArgs>(args?: SelectSubset<T, EnrollmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EnrollmentUpdateManyArgs>(args: SelectSubset<T, EnrollmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Enrollments and returns the data updated in the database.
     * @param {EnrollmentUpdateManyAndReturnArgs} args - Arguments to update many Enrollments.
     * @example
     * // Update many Enrollments
     * const enrollment = await prisma.enrollment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Enrollments and only return the `id`
     * const enrollmentWithIdOnly = await prisma.enrollment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EnrollmentUpdateManyAndReturnArgs>(args: SelectSubset<T, EnrollmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Enrollment.
     * @param {EnrollmentUpsertArgs} args - Arguments to update or create a Enrollment.
     * @example
     * // Update or create a Enrollment
     * const enrollment = await prisma.enrollment.upsert({
     *   create: {
     *     // ... data to create a Enrollment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Enrollment we want to update
     *   }
     * })
     */
    upsert<T extends EnrollmentUpsertArgs>(args: SelectSubset<T, EnrollmentUpsertArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Enrollments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentCountArgs} args - Arguments to filter Enrollments to count.
     * @example
     * // Count the number of Enrollments
     * const count = await prisma.enrollment.count({
     *   where: {
     *     // ... the filter for the Enrollments we want to count
     *   }
     * })
    **/
    count<T extends EnrollmentCountArgs>(
      args?: Subset<T, EnrollmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EnrollmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EnrollmentAggregateArgs>(args: Subset<T, EnrollmentAggregateArgs>): Prisma.PrismaPromise<GetEnrollmentAggregateType<T>>

    /**
     * Group by Enrollment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EnrollmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EnrollmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EnrollmentGroupByArgs['orderBy'] }
        : { orderBy?: EnrollmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EnrollmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEnrollmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Enrollment model
   */
  readonly fields: EnrollmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Enrollment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EnrollmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    academicYear<T extends AcademicYearDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AcademicYearDefaultArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    grades<T extends Enrollment$gradesArgs<ExtArgs> = {}>(args?: Subset<T, Enrollment$gradesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Enrollment model
   */
  interface EnrollmentFieldRefs {
    readonly id: FieldRef<"Enrollment", 'Int'>
    readonly studentId: FieldRef<"Enrollment", 'Int'>
    readonly courseId: FieldRef<"Enrollment", 'Int'>
    readonly academicYearId: FieldRef<"Enrollment", 'Int'>
    readonly createdAt: FieldRef<"Enrollment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Enrollment findUnique
   */
  export type EnrollmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findUniqueOrThrow
   */
  export type EnrollmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment findFirst
   */
  export type EnrollmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findFirstOrThrow
   */
  export type EnrollmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollment to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment findMany
   */
  export type EnrollmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter, which Enrollments to fetch.
     */
    where?: EnrollmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Enrollments to fetch.
     */
    orderBy?: EnrollmentOrderByWithRelationInput | EnrollmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Enrollments.
     */
    cursor?: EnrollmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Enrollments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Enrollments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Enrollments.
     */
    distinct?: EnrollmentScalarFieldEnum | EnrollmentScalarFieldEnum[]
  }

  /**
   * Enrollment create
   */
  export type EnrollmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Enrollment.
     */
    data: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
  }

  /**
   * Enrollment createMany
   */
  export type EnrollmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Enrollment createManyAndReturn
   */
  export type EnrollmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * The data used to create many Enrollments.
     */
    data: EnrollmentCreateManyInput | EnrollmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment update
   */
  export type EnrollmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Enrollment.
     */
    data: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
    /**
     * Choose, which Enrollment to update.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment updateMany
   */
  export type EnrollmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
  }

  /**
   * Enrollment updateManyAndReturn
   */
  export type EnrollmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * The data used to update Enrollments.
     */
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyInput>
    /**
     * Filter which Enrollments to update
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Enrollment upsert
   */
  export type EnrollmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Enrollment to update in case it exists.
     */
    where: EnrollmentWhereUniqueInput
    /**
     * In case the Enrollment found by the `where` argument doesn't exist, create a new Enrollment with this data.
     */
    create: XOR<EnrollmentCreateInput, EnrollmentUncheckedCreateInput>
    /**
     * In case the Enrollment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EnrollmentUpdateInput, EnrollmentUncheckedUpdateInput>
  }

  /**
   * Enrollment delete
   */
  export type EnrollmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
    /**
     * Filter which Enrollment to delete.
     */
    where: EnrollmentWhereUniqueInput
  }

  /**
   * Enrollment deleteMany
   */
  export type EnrollmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Enrollments to delete
     */
    where?: EnrollmentWhereInput
    /**
     * Limit how many Enrollments to delete.
     */
    limit?: number
  }

  /**
   * Enrollment.grades
   */
  export type Enrollment$gradesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    where?: GradeWhereInput
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    cursor?: GradeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GradeScalarFieldEnum | GradeScalarFieldEnum[]
  }

  /**
   * Enrollment without action
   */
  export type EnrollmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Enrollment
     */
    select?: EnrollmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Enrollment
     */
    omit?: EnrollmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EnrollmentInclude<ExtArgs> | null
  }


  /**
   * Model SubjectAssignment
   */

  export type AggregateSubjectAssignment = {
    _count: SubjectAssignmentCountAggregateOutputType | null
    _avg: SubjectAssignmentAvgAggregateOutputType | null
    _sum: SubjectAssignmentSumAggregateOutputType | null
    _min: SubjectAssignmentMinAggregateOutputType | null
    _max: SubjectAssignmentMaxAggregateOutputType | null
  }

  export type SubjectAssignmentAvgAggregateOutputType = {
    id: number | null
    teacherId: number | null
    subjectId: number | null
    courseId: number | null
    academicYearId: number | null
  }

  export type SubjectAssignmentSumAggregateOutputType = {
    id: number | null
    teacherId: number | null
    subjectId: number | null
    courseId: number | null
    academicYearId: number | null
  }

  export type SubjectAssignmentMinAggregateOutputType = {
    id: number | null
    teacherId: number | null
    subjectId: number | null
    courseId: number | null
    academicYearId: number | null
  }

  export type SubjectAssignmentMaxAggregateOutputType = {
    id: number | null
    teacherId: number | null
    subjectId: number | null
    courseId: number | null
    academicYearId: number | null
  }

  export type SubjectAssignmentCountAggregateOutputType = {
    id: number
    teacherId: number
    subjectId: number
    courseId: number
    academicYearId: number
    _all: number
  }


  export type SubjectAssignmentAvgAggregateInputType = {
    id?: true
    teacherId?: true
    subjectId?: true
    courseId?: true
    academicYearId?: true
  }

  export type SubjectAssignmentSumAggregateInputType = {
    id?: true
    teacherId?: true
    subjectId?: true
    courseId?: true
    academicYearId?: true
  }

  export type SubjectAssignmentMinAggregateInputType = {
    id?: true
    teacherId?: true
    subjectId?: true
    courseId?: true
    academicYearId?: true
  }

  export type SubjectAssignmentMaxAggregateInputType = {
    id?: true
    teacherId?: true
    subjectId?: true
    courseId?: true
    academicYearId?: true
  }

  export type SubjectAssignmentCountAggregateInputType = {
    id?: true
    teacherId?: true
    subjectId?: true
    courseId?: true
    academicYearId?: true
    _all?: true
  }

  export type SubjectAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubjectAssignment to aggregate.
     */
    where?: SubjectAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubjectAssignments to fetch.
     */
    orderBy?: SubjectAssignmentOrderByWithRelationInput | SubjectAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubjectAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubjectAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubjectAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubjectAssignments
    **/
    _count?: true | SubjectAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubjectAssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubjectAssignmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubjectAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubjectAssignmentMaxAggregateInputType
  }

  export type GetSubjectAssignmentAggregateType<T extends SubjectAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateSubjectAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubjectAssignment[P]>
      : GetScalarType<T[P], AggregateSubjectAssignment[P]>
  }




  export type SubjectAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectAssignmentWhereInput
    orderBy?: SubjectAssignmentOrderByWithAggregationInput | SubjectAssignmentOrderByWithAggregationInput[]
    by: SubjectAssignmentScalarFieldEnum[] | SubjectAssignmentScalarFieldEnum
    having?: SubjectAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubjectAssignmentCountAggregateInputType | true
    _avg?: SubjectAssignmentAvgAggregateInputType
    _sum?: SubjectAssignmentSumAggregateInputType
    _min?: SubjectAssignmentMinAggregateInputType
    _max?: SubjectAssignmentMaxAggregateInputType
  }

  export type SubjectAssignmentGroupByOutputType = {
    id: number
    teacherId: number
    subjectId: number
    courseId: number
    academicYearId: number
    _count: SubjectAssignmentCountAggregateOutputType | null
    _avg: SubjectAssignmentAvgAggregateOutputType | null
    _sum: SubjectAssignmentSumAggregateOutputType | null
    _min: SubjectAssignmentMinAggregateOutputType | null
    _max: SubjectAssignmentMaxAggregateOutputType | null
  }

  type GetSubjectAssignmentGroupByPayload<T extends SubjectAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubjectAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubjectAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubjectAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], SubjectAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type SubjectAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    subjectId?: boolean
    courseId?: boolean
    academicYearId?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    academicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subjectAssignment"]>

  export type SubjectAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    subjectId?: boolean
    courseId?: boolean
    academicYearId?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    academicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subjectAssignment"]>

  export type SubjectAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teacherId?: boolean
    subjectId?: boolean
    courseId?: boolean
    academicYearId?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    academicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subjectAssignment"]>

  export type SubjectAssignmentSelectScalar = {
    id?: boolean
    teacherId?: boolean
    subjectId?: boolean
    courseId?: boolean
    academicYearId?: boolean
  }

  export type SubjectAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teacherId" | "subjectId" | "courseId" | "academicYearId", ExtArgs["result"]["subjectAssignment"]>
  export type SubjectAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    academicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }
  export type SubjectAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    academicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }
  export type SubjectAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    course?: boolean | CourseDefaultArgs<ExtArgs>
    academicYear?: boolean | AcademicYearDefaultArgs<ExtArgs>
  }

  export type $SubjectAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubjectAssignment"
    objects: {
      teacher: Prisma.$TeacherPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
      course: Prisma.$CoursePayload<ExtArgs>
      academicYear: Prisma.$AcademicYearPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      teacherId: number
      subjectId: number
      courseId: number
      academicYearId: number
    }, ExtArgs["result"]["subjectAssignment"]>
    composites: {}
  }

  type SubjectAssignmentGetPayload<S extends boolean | null | undefined | SubjectAssignmentDefaultArgs> = $Result.GetResult<Prisma.$SubjectAssignmentPayload, S>

  type SubjectAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubjectAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubjectAssignmentCountAggregateInputType | true
    }

  export interface SubjectAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubjectAssignment'], meta: { name: 'SubjectAssignment' } }
    /**
     * Find zero or one SubjectAssignment that matches the filter.
     * @param {SubjectAssignmentFindUniqueArgs} args - Arguments to find a SubjectAssignment
     * @example
     * // Get one SubjectAssignment
     * const subjectAssignment = await prisma.subjectAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectAssignmentFindUniqueArgs>(args: SelectSubset<T, SubjectAssignmentFindUniqueArgs<ExtArgs>>): Prisma__SubjectAssignmentClient<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubjectAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectAssignmentFindUniqueOrThrowArgs} args - Arguments to find a SubjectAssignment
     * @example
     * // Get one SubjectAssignment
     * const subjectAssignment = await prisma.subjectAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, SubjectAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubjectAssignmentClient<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubjectAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAssignmentFindFirstArgs} args - Arguments to find a SubjectAssignment
     * @example
     * // Get one SubjectAssignment
     * const subjectAssignment = await prisma.subjectAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectAssignmentFindFirstArgs>(args?: SelectSubset<T, SubjectAssignmentFindFirstArgs<ExtArgs>>): Prisma__SubjectAssignmentClient<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubjectAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAssignmentFindFirstOrThrowArgs} args - Arguments to find a SubjectAssignment
     * @example
     * // Get one SubjectAssignment
     * const subjectAssignment = await prisma.subjectAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, SubjectAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubjectAssignmentClient<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubjectAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubjectAssignments
     * const subjectAssignments = await prisma.subjectAssignment.findMany()
     * 
     * // Get first 10 SubjectAssignments
     * const subjectAssignments = await prisma.subjectAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subjectAssignmentWithIdOnly = await prisma.subjectAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubjectAssignmentFindManyArgs>(args?: SelectSubset<T, SubjectAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubjectAssignment.
     * @param {SubjectAssignmentCreateArgs} args - Arguments to create a SubjectAssignment.
     * @example
     * // Create one SubjectAssignment
     * const SubjectAssignment = await prisma.subjectAssignment.create({
     *   data: {
     *     // ... data to create a SubjectAssignment
     *   }
     * })
     * 
     */
    create<T extends SubjectAssignmentCreateArgs>(args: SelectSubset<T, SubjectAssignmentCreateArgs<ExtArgs>>): Prisma__SubjectAssignmentClient<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubjectAssignments.
     * @param {SubjectAssignmentCreateManyArgs} args - Arguments to create many SubjectAssignments.
     * @example
     * // Create many SubjectAssignments
     * const subjectAssignment = await prisma.subjectAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubjectAssignmentCreateManyArgs>(args?: SelectSubset<T, SubjectAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubjectAssignments and returns the data saved in the database.
     * @param {SubjectAssignmentCreateManyAndReturnArgs} args - Arguments to create many SubjectAssignments.
     * @example
     * // Create many SubjectAssignments
     * const subjectAssignment = await prisma.subjectAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubjectAssignments and only return the `id`
     * const subjectAssignmentWithIdOnly = await prisma.subjectAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubjectAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, SubjectAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubjectAssignment.
     * @param {SubjectAssignmentDeleteArgs} args - Arguments to delete one SubjectAssignment.
     * @example
     * // Delete one SubjectAssignment
     * const SubjectAssignment = await prisma.subjectAssignment.delete({
     *   where: {
     *     // ... filter to delete one SubjectAssignment
     *   }
     * })
     * 
     */
    delete<T extends SubjectAssignmentDeleteArgs>(args: SelectSubset<T, SubjectAssignmentDeleteArgs<ExtArgs>>): Prisma__SubjectAssignmentClient<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubjectAssignment.
     * @param {SubjectAssignmentUpdateArgs} args - Arguments to update one SubjectAssignment.
     * @example
     * // Update one SubjectAssignment
     * const subjectAssignment = await prisma.subjectAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubjectAssignmentUpdateArgs>(args: SelectSubset<T, SubjectAssignmentUpdateArgs<ExtArgs>>): Prisma__SubjectAssignmentClient<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubjectAssignments.
     * @param {SubjectAssignmentDeleteManyArgs} args - Arguments to filter SubjectAssignments to delete.
     * @example
     * // Delete a few SubjectAssignments
     * const { count } = await prisma.subjectAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubjectAssignmentDeleteManyArgs>(args?: SelectSubset<T, SubjectAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubjectAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubjectAssignments
     * const subjectAssignment = await prisma.subjectAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubjectAssignmentUpdateManyArgs>(args: SelectSubset<T, SubjectAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubjectAssignments and returns the data updated in the database.
     * @param {SubjectAssignmentUpdateManyAndReturnArgs} args - Arguments to update many SubjectAssignments.
     * @example
     * // Update many SubjectAssignments
     * const subjectAssignment = await prisma.subjectAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubjectAssignments and only return the `id`
     * const subjectAssignmentWithIdOnly = await prisma.subjectAssignment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubjectAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, SubjectAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubjectAssignment.
     * @param {SubjectAssignmentUpsertArgs} args - Arguments to update or create a SubjectAssignment.
     * @example
     * // Update or create a SubjectAssignment
     * const subjectAssignment = await prisma.subjectAssignment.upsert({
     *   create: {
     *     // ... data to create a SubjectAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubjectAssignment we want to update
     *   }
     * })
     */
    upsert<T extends SubjectAssignmentUpsertArgs>(args: SelectSubset<T, SubjectAssignmentUpsertArgs<ExtArgs>>): Prisma__SubjectAssignmentClient<$Result.GetResult<Prisma.$SubjectAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubjectAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAssignmentCountArgs} args - Arguments to filter SubjectAssignments to count.
     * @example
     * // Count the number of SubjectAssignments
     * const count = await prisma.subjectAssignment.count({
     *   where: {
     *     // ... the filter for the SubjectAssignments we want to count
     *   }
     * })
    **/
    count<T extends SubjectAssignmentCountArgs>(
      args?: Subset<T, SubjectAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubjectAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubjectAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubjectAssignmentAggregateArgs>(args: Subset<T, SubjectAssignmentAggregateArgs>): Prisma.PrismaPromise<GetSubjectAssignmentAggregateType<T>>

    /**
     * Group by SubjectAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubjectAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubjectAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: SubjectAssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubjectAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubjectAssignment model
   */
  readonly fields: SubjectAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubjectAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubjectAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends TeacherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeacherDefaultArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    course<T extends CourseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CourseDefaultArgs<ExtArgs>>): Prisma__CourseClient<$Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    academicYear<T extends AcademicYearDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AcademicYearDefaultArgs<ExtArgs>>): Prisma__AcademicYearClient<$Result.GetResult<Prisma.$AcademicYearPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubjectAssignment model
   */
  interface SubjectAssignmentFieldRefs {
    readonly id: FieldRef<"SubjectAssignment", 'Int'>
    readonly teacherId: FieldRef<"SubjectAssignment", 'Int'>
    readonly subjectId: FieldRef<"SubjectAssignment", 'Int'>
    readonly courseId: FieldRef<"SubjectAssignment", 'Int'>
    readonly academicYearId: FieldRef<"SubjectAssignment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SubjectAssignment findUnique
   */
  export type SubjectAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which SubjectAssignment to fetch.
     */
    where: SubjectAssignmentWhereUniqueInput
  }

  /**
   * SubjectAssignment findUniqueOrThrow
   */
  export type SubjectAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which SubjectAssignment to fetch.
     */
    where: SubjectAssignmentWhereUniqueInput
  }

  /**
   * SubjectAssignment findFirst
   */
  export type SubjectAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which SubjectAssignment to fetch.
     */
    where?: SubjectAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubjectAssignments to fetch.
     */
    orderBy?: SubjectAssignmentOrderByWithRelationInput | SubjectAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubjectAssignments.
     */
    cursor?: SubjectAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubjectAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubjectAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubjectAssignments.
     */
    distinct?: SubjectAssignmentScalarFieldEnum | SubjectAssignmentScalarFieldEnum[]
  }

  /**
   * SubjectAssignment findFirstOrThrow
   */
  export type SubjectAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which SubjectAssignment to fetch.
     */
    where?: SubjectAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubjectAssignments to fetch.
     */
    orderBy?: SubjectAssignmentOrderByWithRelationInput | SubjectAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubjectAssignments.
     */
    cursor?: SubjectAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubjectAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubjectAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubjectAssignments.
     */
    distinct?: SubjectAssignmentScalarFieldEnum | SubjectAssignmentScalarFieldEnum[]
  }

  /**
   * SubjectAssignment findMany
   */
  export type SubjectAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which SubjectAssignments to fetch.
     */
    where?: SubjectAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubjectAssignments to fetch.
     */
    orderBy?: SubjectAssignmentOrderByWithRelationInput | SubjectAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubjectAssignments.
     */
    cursor?: SubjectAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubjectAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubjectAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubjectAssignments.
     */
    distinct?: SubjectAssignmentScalarFieldEnum | SubjectAssignmentScalarFieldEnum[]
  }

  /**
   * SubjectAssignment create
   */
  export type SubjectAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a SubjectAssignment.
     */
    data: XOR<SubjectAssignmentCreateInput, SubjectAssignmentUncheckedCreateInput>
  }

  /**
   * SubjectAssignment createMany
   */
  export type SubjectAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubjectAssignments.
     */
    data: SubjectAssignmentCreateManyInput | SubjectAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubjectAssignment createManyAndReturn
   */
  export type SubjectAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many SubjectAssignments.
     */
    data: SubjectAssignmentCreateManyInput | SubjectAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubjectAssignment update
   */
  export type SubjectAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a SubjectAssignment.
     */
    data: XOR<SubjectAssignmentUpdateInput, SubjectAssignmentUncheckedUpdateInput>
    /**
     * Choose, which SubjectAssignment to update.
     */
    where: SubjectAssignmentWhereUniqueInput
  }

  /**
   * SubjectAssignment updateMany
   */
  export type SubjectAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubjectAssignments.
     */
    data: XOR<SubjectAssignmentUpdateManyMutationInput, SubjectAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which SubjectAssignments to update
     */
    where?: SubjectAssignmentWhereInput
    /**
     * Limit how many SubjectAssignments to update.
     */
    limit?: number
  }

  /**
   * SubjectAssignment updateManyAndReturn
   */
  export type SubjectAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update SubjectAssignments.
     */
    data: XOR<SubjectAssignmentUpdateManyMutationInput, SubjectAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which SubjectAssignments to update
     */
    where?: SubjectAssignmentWhereInput
    /**
     * Limit how many SubjectAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubjectAssignment upsert
   */
  export type SubjectAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the SubjectAssignment to update in case it exists.
     */
    where: SubjectAssignmentWhereUniqueInput
    /**
     * In case the SubjectAssignment found by the `where` argument doesn't exist, create a new SubjectAssignment with this data.
     */
    create: XOR<SubjectAssignmentCreateInput, SubjectAssignmentUncheckedCreateInput>
    /**
     * In case the SubjectAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubjectAssignmentUpdateInput, SubjectAssignmentUncheckedUpdateInput>
  }

  /**
   * SubjectAssignment delete
   */
  export type SubjectAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
    /**
     * Filter which SubjectAssignment to delete.
     */
    where: SubjectAssignmentWhereUniqueInput
  }

  /**
   * SubjectAssignment deleteMany
   */
  export type SubjectAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubjectAssignments to delete
     */
    where?: SubjectAssignmentWhereInput
    /**
     * Limit how many SubjectAssignments to delete.
     */
    limit?: number
  }

  /**
   * SubjectAssignment without action
   */
  export type SubjectAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectAssignment
     */
    select?: SubjectAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubjectAssignment
     */
    omit?: SubjectAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model Grade
   */

  export type AggregateGrade = {
    _count: GradeCountAggregateOutputType | null
    _avg: GradeAvgAggregateOutputType | null
    _sum: GradeSumAggregateOutputType | null
    _min: GradeMinAggregateOutputType | null
    _max: GradeMaxAggregateOutputType | null
  }

  export type GradeAvgAggregateOutputType = {
    id: number | null
    score: number | null
    period: number | null
    enrollmentId: number | null
    subjectId: number | null
  }

  export type GradeSumAggregateOutputType = {
    id: number | null
    score: number | null
    period: number | null
    enrollmentId: number | null
    subjectId: number | null
  }

  export type GradeMinAggregateOutputType = {
    id: number | null
    score: number | null
    period: number | null
    enrollmentId: number | null
    subjectId: number | null
    updatedAt: Date | null
  }

  export type GradeMaxAggregateOutputType = {
    id: number | null
    score: number | null
    period: number | null
    enrollmentId: number | null
    subjectId: number | null
    updatedAt: Date | null
  }

  export type GradeCountAggregateOutputType = {
    id: number
    score: number
    period: number
    enrollmentId: number
    subjectId: number
    updatedAt: number
    _all: number
  }


  export type GradeAvgAggregateInputType = {
    id?: true
    score?: true
    period?: true
    enrollmentId?: true
    subjectId?: true
  }

  export type GradeSumAggregateInputType = {
    id?: true
    score?: true
    period?: true
    enrollmentId?: true
    subjectId?: true
  }

  export type GradeMinAggregateInputType = {
    id?: true
    score?: true
    period?: true
    enrollmentId?: true
    subjectId?: true
    updatedAt?: true
  }

  export type GradeMaxAggregateInputType = {
    id?: true
    score?: true
    period?: true
    enrollmentId?: true
    subjectId?: true
    updatedAt?: true
  }

  export type GradeCountAggregateInputType = {
    id?: true
    score?: true
    period?: true
    enrollmentId?: true
    subjectId?: true
    updatedAt?: true
    _all?: true
  }

  export type GradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Grade to aggregate.
     */
    where?: GradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grades to fetch.
     */
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Grades
    **/
    _count?: true | GradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GradeMaxAggregateInputType
  }

  export type GetGradeAggregateType<T extends GradeAggregateArgs> = {
        [P in keyof T & keyof AggregateGrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGrade[P]>
      : GetScalarType<T[P], AggregateGrade[P]>
  }




  export type GradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GradeWhereInput
    orderBy?: GradeOrderByWithAggregationInput | GradeOrderByWithAggregationInput[]
    by: GradeScalarFieldEnum[] | GradeScalarFieldEnum
    having?: GradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GradeCountAggregateInputType | true
    _avg?: GradeAvgAggregateInputType
    _sum?: GradeSumAggregateInputType
    _min?: GradeMinAggregateInputType
    _max?: GradeMaxAggregateInputType
  }

  export type GradeGroupByOutputType = {
    id: number
    score: number
    period: number
    enrollmentId: number
    subjectId: number
    updatedAt: Date
    _count: GradeCountAggregateOutputType | null
    _avg: GradeAvgAggregateOutputType | null
    _sum: GradeSumAggregateOutputType | null
    _min: GradeMinAggregateOutputType | null
    _max: GradeMaxAggregateOutputType | null
  }

  type GetGradeGroupByPayload<T extends GradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GradeGroupByOutputType[P]>
            : GetScalarType<T[P], GradeGroupByOutputType[P]>
        }
      >
    >


  export type GradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    score?: boolean
    period?: boolean
    enrollmentId?: boolean
    subjectId?: boolean
    updatedAt?: boolean
    enrollment?: boolean | EnrollmentDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["grade"]>

  export type GradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    score?: boolean
    period?: boolean
    enrollmentId?: boolean
    subjectId?: boolean
    updatedAt?: boolean
    enrollment?: boolean | EnrollmentDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["grade"]>

  export type GradeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    score?: boolean
    period?: boolean
    enrollmentId?: boolean
    subjectId?: boolean
    updatedAt?: boolean
    enrollment?: boolean | EnrollmentDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["grade"]>

  export type GradeSelectScalar = {
    id?: boolean
    score?: boolean
    period?: boolean
    enrollmentId?: boolean
    subjectId?: boolean
    updatedAt?: boolean
  }

  export type GradeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "score" | "period" | "enrollmentId" | "subjectId" | "updatedAt", ExtArgs["result"]["grade"]>
  export type GradeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollment?: boolean | EnrollmentDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type GradeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollment?: boolean | EnrollmentDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }
  export type GradeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrollment?: boolean | EnrollmentDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
  }

  export type $GradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Grade"
    objects: {
      enrollment: Prisma.$EnrollmentPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      score: number
      period: number
      enrollmentId: number
      subjectId: number
      updatedAt: Date
    }, ExtArgs["result"]["grade"]>
    composites: {}
  }

  type GradeGetPayload<S extends boolean | null | undefined | GradeDefaultArgs> = $Result.GetResult<Prisma.$GradePayload, S>

  type GradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GradeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GradeCountAggregateInputType | true
    }

  export interface GradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Grade'], meta: { name: 'Grade' } }
    /**
     * Find zero or one Grade that matches the filter.
     * @param {GradeFindUniqueArgs} args - Arguments to find a Grade
     * @example
     * // Get one Grade
     * const grade = await prisma.grade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GradeFindUniqueArgs>(args: SelectSubset<T, GradeFindUniqueArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Grade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GradeFindUniqueOrThrowArgs} args - Arguments to find a Grade
     * @example
     * // Get one Grade
     * const grade = await prisma.grade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GradeFindUniqueOrThrowArgs>(args: SelectSubset<T, GradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Grade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeFindFirstArgs} args - Arguments to find a Grade
     * @example
     * // Get one Grade
     * const grade = await prisma.grade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GradeFindFirstArgs>(args?: SelectSubset<T, GradeFindFirstArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Grade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeFindFirstOrThrowArgs} args - Arguments to find a Grade
     * @example
     * // Get one Grade
     * const grade = await prisma.grade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GradeFindFirstOrThrowArgs>(args?: SelectSubset<T, GradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Grades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Grades
     * const grades = await prisma.grade.findMany()
     * 
     * // Get first 10 Grades
     * const grades = await prisma.grade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gradeWithIdOnly = await prisma.grade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GradeFindManyArgs>(args?: SelectSubset<T, GradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Grade.
     * @param {GradeCreateArgs} args - Arguments to create a Grade.
     * @example
     * // Create one Grade
     * const Grade = await prisma.grade.create({
     *   data: {
     *     // ... data to create a Grade
     *   }
     * })
     * 
     */
    create<T extends GradeCreateArgs>(args: SelectSubset<T, GradeCreateArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Grades.
     * @param {GradeCreateManyArgs} args - Arguments to create many Grades.
     * @example
     * // Create many Grades
     * const grade = await prisma.grade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GradeCreateManyArgs>(args?: SelectSubset<T, GradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Grades and returns the data saved in the database.
     * @param {GradeCreateManyAndReturnArgs} args - Arguments to create many Grades.
     * @example
     * // Create many Grades
     * const grade = await prisma.grade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Grades and only return the `id`
     * const gradeWithIdOnly = await prisma.grade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GradeCreateManyAndReturnArgs>(args?: SelectSubset<T, GradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Grade.
     * @param {GradeDeleteArgs} args - Arguments to delete one Grade.
     * @example
     * // Delete one Grade
     * const Grade = await prisma.grade.delete({
     *   where: {
     *     // ... filter to delete one Grade
     *   }
     * })
     * 
     */
    delete<T extends GradeDeleteArgs>(args: SelectSubset<T, GradeDeleteArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Grade.
     * @param {GradeUpdateArgs} args - Arguments to update one Grade.
     * @example
     * // Update one Grade
     * const grade = await prisma.grade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GradeUpdateArgs>(args: SelectSubset<T, GradeUpdateArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Grades.
     * @param {GradeDeleteManyArgs} args - Arguments to filter Grades to delete.
     * @example
     * // Delete a few Grades
     * const { count } = await prisma.grade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GradeDeleteManyArgs>(args?: SelectSubset<T, GradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Grades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Grades
     * const grade = await prisma.grade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GradeUpdateManyArgs>(args: SelectSubset<T, GradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Grades and returns the data updated in the database.
     * @param {GradeUpdateManyAndReturnArgs} args - Arguments to update many Grades.
     * @example
     * // Update many Grades
     * const grade = await prisma.grade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Grades and only return the `id`
     * const gradeWithIdOnly = await prisma.grade.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GradeUpdateManyAndReturnArgs>(args: SelectSubset<T, GradeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Grade.
     * @param {GradeUpsertArgs} args - Arguments to update or create a Grade.
     * @example
     * // Update or create a Grade
     * const grade = await prisma.grade.upsert({
     *   create: {
     *     // ... data to create a Grade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Grade we want to update
     *   }
     * })
     */
    upsert<T extends GradeUpsertArgs>(args: SelectSubset<T, GradeUpsertArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Grades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeCountArgs} args - Arguments to filter Grades to count.
     * @example
     * // Count the number of Grades
     * const count = await prisma.grade.count({
     *   where: {
     *     // ... the filter for the Grades we want to count
     *   }
     * })
    **/
    count<T extends GradeCountArgs>(
      args?: Subset<T, GradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Grade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GradeAggregateArgs>(args: Subset<T, GradeAggregateArgs>): Prisma.PrismaPromise<GetGradeAggregateType<T>>

    /**
     * Group by Grade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GradeGroupByArgs['orderBy'] }
        : { orderBy?: GradeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Grade model
   */
  readonly fields: GradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Grade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    enrollment<T extends EnrollmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EnrollmentDefaultArgs<ExtArgs>>): Prisma__EnrollmentClient<$Result.GetResult<Prisma.$EnrollmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Grade model
   */
  interface GradeFieldRefs {
    readonly id: FieldRef<"Grade", 'Int'>
    readonly score: FieldRef<"Grade", 'Int'>
    readonly period: FieldRef<"Grade", 'Int'>
    readonly enrollmentId: FieldRef<"Grade", 'Int'>
    readonly subjectId: FieldRef<"Grade", 'Int'>
    readonly updatedAt: FieldRef<"Grade", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Grade findUnique
   */
  export type GradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * Filter, which Grade to fetch.
     */
    where: GradeWhereUniqueInput
  }

  /**
   * Grade findUniqueOrThrow
   */
  export type GradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * Filter, which Grade to fetch.
     */
    where: GradeWhereUniqueInput
  }

  /**
   * Grade findFirst
   */
  export type GradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * Filter, which Grade to fetch.
     */
    where?: GradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grades to fetch.
     */
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Grades.
     */
    cursor?: GradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Grades.
     */
    distinct?: GradeScalarFieldEnum | GradeScalarFieldEnum[]
  }

  /**
   * Grade findFirstOrThrow
   */
  export type GradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * Filter, which Grade to fetch.
     */
    where?: GradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grades to fetch.
     */
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Grades.
     */
    cursor?: GradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Grades.
     */
    distinct?: GradeScalarFieldEnum | GradeScalarFieldEnum[]
  }

  /**
   * Grade findMany
   */
  export type GradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * Filter, which Grades to fetch.
     */
    where?: GradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grades to fetch.
     */
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Grades.
     */
    cursor?: GradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Grades.
     */
    distinct?: GradeScalarFieldEnum | GradeScalarFieldEnum[]
  }

  /**
   * Grade create
   */
  export type GradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * The data needed to create a Grade.
     */
    data: XOR<GradeCreateInput, GradeUncheckedCreateInput>
  }

  /**
   * Grade createMany
   */
  export type GradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Grades.
     */
    data: GradeCreateManyInput | GradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Grade createManyAndReturn
   */
  export type GradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * The data used to create many Grades.
     */
    data: GradeCreateManyInput | GradeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Grade update
   */
  export type GradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * The data needed to update a Grade.
     */
    data: XOR<GradeUpdateInput, GradeUncheckedUpdateInput>
    /**
     * Choose, which Grade to update.
     */
    where: GradeWhereUniqueInput
  }

  /**
   * Grade updateMany
   */
  export type GradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Grades.
     */
    data: XOR<GradeUpdateManyMutationInput, GradeUncheckedUpdateManyInput>
    /**
     * Filter which Grades to update
     */
    where?: GradeWhereInput
    /**
     * Limit how many Grades to update.
     */
    limit?: number
  }

  /**
   * Grade updateManyAndReturn
   */
  export type GradeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * The data used to update Grades.
     */
    data: XOR<GradeUpdateManyMutationInput, GradeUncheckedUpdateManyInput>
    /**
     * Filter which Grades to update
     */
    where?: GradeWhereInput
    /**
     * Limit how many Grades to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Grade upsert
   */
  export type GradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * The filter to search for the Grade to update in case it exists.
     */
    where: GradeWhereUniqueInput
    /**
     * In case the Grade found by the `where` argument doesn't exist, create a new Grade with this data.
     */
    create: XOR<GradeCreateInput, GradeUncheckedCreateInput>
    /**
     * In case the Grade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GradeUpdateInput, GradeUncheckedUpdateInput>
  }

  /**
   * Grade delete
   */
  export type GradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
    /**
     * Filter which Grade to delete.
     */
    where: GradeWhereUniqueInput
  }

  /**
   * Grade deleteMany
   */
  export type GradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Grades to delete
     */
    where?: GradeWhereInput
    /**
     * Limit how many Grades to delete.
     */
    limit?: number
  }

  /**
   * Grade without action
   */
  export type GradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GradeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TeacherScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName'
  };

  export type TeacherScalarFieldEnum = (typeof TeacherScalarFieldEnum)[keyof typeof TeacherScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    id: 'id',
    rude: 'rude',
    firstName: 'firstName',
    lastName: 'lastName',
    birthDate: 'birthDate'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const CourseScalarFieldEnum: {
    id: 'id',
    level: 'level',
    parallel: 'parallel'
  };

  export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum]


  export const SubjectScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type SubjectScalarFieldEnum = (typeof SubjectScalarFieldEnum)[keyof typeof SubjectScalarFieldEnum]


  export const AcademicYearScalarFieldEnum: {
    id: 'id',
    year: 'year'
  };

  export type AcademicYearScalarFieldEnum = (typeof AcademicYearScalarFieldEnum)[keyof typeof AcademicYearScalarFieldEnum]


  export const EnrollmentScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    courseId: 'courseId',
    academicYearId: 'academicYearId',
    createdAt: 'createdAt'
  };

  export type EnrollmentScalarFieldEnum = (typeof EnrollmentScalarFieldEnum)[keyof typeof EnrollmentScalarFieldEnum]


  export const SubjectAssignmentScalarFieldEnum: {
    id: 'id',
    teacherId: 'teacherId',
    subjectId: 'subjectId',
    courseId: 'courseId',
    academicYearId: 'academicYearId'
  };

  export type SubjectAssignmentScalarFieldEnum = (typeof SubjectAssignmentScalarFieldEnum)[keyof typeof SubjectAssignmentScalarFieldEnum]


  export const GradeScalarFieldEnum: {
    id: 'id',
    score: 'score',
    period: 'period',
    enrollmentId: 'enrollmentId',
    subjectId: 'subjectId',
    updatedAt: 'updatedAt'
  };

  export type GradeScalarFieldEnum = (typeof GradeScalarFieldEnum)[keyof typeof GradeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    teacher?: TeacherOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TeacherWhereInput = {
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    id?: IntFilter<"Teacher"> | number
    userId?: IntFilter<"Teacher"> | number
    firstName?: StringFilter<"Teacher"> | string
    lastName?: StringFilter<"Teacher"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignments?: SubjectAssignmentListRelationFilter
  }

  export type TeacherOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    user?: UserOrderByWithRelationInput
    assignments?: SubjectAssignmentOrderByRelationAggregateInput
  }

  export type TeacherWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    firstName?: StringFilter<"Teacher"> | string
    lastName?: StringFilter<"Teacher"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    assignments?: SubjectAssignmentListRelationFilter
  }, "id" | "userId">

  export type TeacherOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    _count?: TeacherCountOrderByAggregateInput
    _avg?: TeacherAvgOrderByAggregateInput
    _max?: TeacherMaxOrderByAggregateInput
    _min?: TeacherMinOrderByAggregateInput
    _sum?: TeacherSumOrderByAggregateInput
  }

  export type TeacherScalarWhereWithAggregatesInput = {
    AND?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    OR?: TeacherScalarWhereWithAggregatesInput[]
    NOT?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Teacher"> | number
    userId?: IntWithAggregatesFilter<"Teacher"> | number
    firstName?: StringWithAggregatesFilter<"Teacher"> | string
    lastName?: StringWithAggregatesFilter<"Teacher"> | string
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: IntFilter<"Student"> | number
    rude?: StringFilter<"Student"> | string
    firstName?: StringFilter<"Student"> | string
    lastName?: StringFilter<"Student"> | string
    birthDate?: DateTimeNullableFilter<"Student"> | Date | string | null
    enrollments?: EnrollmentListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    rude?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    enrollments?: EnrollmentOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    rude?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    firstName?: StringFilter<"Student"> | string
    lastName?: StringFilter<"Student"> | string
    birthDate?: DateTimeNullableFilter<"Student"> | Date | string | null
    enrollments?: EnrollmentListRelationFilter
  }, "id" | "rude">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    rude?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Student"> | number
    rude?: StringWithAggregatesFilter<"Student"> | string
    firstName?: StringWithAggregatesFilter<"Student"> | string
    lastName?: StringWithAggregatesFilter<"Student"> | string
    birthDate?: DateTimeNullableWithAggregatesFilter<"Student"> | Date | string | null
  }

  export type CourseWhereInput = {
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    id?: IntFilter<"Course"> | number
    level?: StringFilter<"Course"> | string
    parallel?: StringFilter<"Course"> | string
    enrollments?: EnrollmentListRelationFilter
    assignments?: SubjectAssignmentListRelationFilter
  }

  export type CourseOrderByWithRelationInput = {
    id?: SortOrder
    level?: SortOrder
    parallel?: SortOrder
    enrollments?: EnrollmentOrderByRelationAggregateInput
    assignments?: SubjectAssignmentOrderByRelationAggregateInput
  }

  export type CourseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CourseWhereInput | CourseWhereInput[]
    OR?: CourseWhereInput[]
    NOT?: CourseWhereInput | CourseWhereInput[]
    level?: StringFilter<"Course"> | string
    parallel?: StringFilter<"Course"> | string
    enrollments?: EnrollmentListRelationFilter
    assignments?: SubjectAssignmentListRelationFilter
  }, "id">

  export type CourseOrderByWithAggregationInput = {
    id?: SortOrder
    level?: SortOrder
    parallel?: SortOrder
    _count?: CourseCountOrderByAggregateInput
    _avg?: CourseAvgOrderByAggregateInput
    _max?: CourseMaxOrderByAggregateInput
    _min?: CourseMinOrderByAggregateInput
    _sum?: CourseSumOrderByAggregateInput
  }

  export type CourseScalarWhereWithAggregatesInput = {
    AND?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    OR?: CourseScalarWhereWithAggregatesInput[]
    NOT?: CourseScalarWhereWithAggregatesInput | CourseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Course"> | number
    level?: StringWithAggregatesFilter<"Course"> | string
    parallel?: StringWithAggregatesFilter<"Course"> | string
  }

  export type SubjectWhereInput = {
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    id?: IntFilter<"Subject"> | number
    name?: StringFilter<"Subject"> | string
    assignments?: SubjectAssignmentListRelationFilter
    grades?: GradeListRelationFilter
  }

  export type SubjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    assignments?: SubjectAssignmentOrderByRelationAggregateInput
    grades?: GradeOrderByRelationAggregateInput
  }

  export type SubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    name?: StringFilter<"Subject"> | string
    assignments?: SubjectAssignmentListRelationFilter
    grades?: GradeListRelationFilter
  }, "id">

  export type SubjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: SubjectCountOrderByAggregateInput
    _avg?: SubjectAvgOrderByAggregateInput
    _max?: SubjectMaxOrderByAggregateInput
    _min?: SubjectMinOrderByAggregateInput
    _sum?: SubjectSumOrderByAggregateInput
  }

  export type SubjectScalarWhereWithAggregatesInput = {
    AND?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    OR?: SubjectScalarWhereWithAggregatesInput[]
    NOT?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Subject"> | number
    name?: StringWithAggregatesFilter<"Subject"> | string
  }

  export type AcademicYearWhereInput = {
    AND?: AcademicYearWhereInput | AcademicYearWhereInput[]
    OR?: AcademicYearWhereInput[]
    NOT?: AcademicYearWhereInput | AcademicYearWhereInput[]
    id?: IntFilter<"AcademicYear"> | number
    year?: IntFilter<"AcademicYear"> | number
    enrollments?: EnrollmentListRelationFilter
    assignments?: SubjectAssignmentListRelationFilter
  }

  export type AcademicYearOrderByWithRelationInput = {
    id?: SortOrder
    year?: SortOrder
    enrollments?: EnrollmentOrderByRelationAggregateInput
    assignments?: SubjectAssignmentOrderByRelationAggregateInput
  }

  export type AcademicYearWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    year?: number
    AND?: AcademicYearWhereInput | AcademicYearWhereInput[]
    OR?: AcademicYearWhereInput[]
    NOT?: AcademicYearWhereInput | AcademicYearWhereInput[]
    enrollments?: EnrollmentListRelationFilter
    assignments?: SubjectAssignmentListRelationFilter
  }, "id" | "year">

  export type AcademicYearOrderByWithAggregationInput = {
    id?: SortOrder
    year?: SortOrder
    _count?: AcademicYearCountOrderByAggregateInput
    _avg?: AcademicYearAvgOrderByAggregateInput
    _max?: AcademicYearMaxOrderByAggregateInput
    _min?: AcademicYearMinOrderByAggregateInput
    _sum?: AcademicYearSumOrderByAggregateInput
  }

  export type AcademicYearScalarWhereWithAggregatesInput = {
    AND?: AcademicYearScalarWhereWithAggregatesInput | AcademicYearScalarWhereWithAggregatesInput[]
    OR?: AcademicYearScalarWhereWithAggregatesInput[]
    NOT?: AcademicYearScalarWhereWithAggregatesInput | AcademicYearScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AcademicYear"> | number
    year?: IntWithAggregatesFilter<"AcademicYear"> | number
  }

  export type EnrollmentWhereInput = {
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    id?: IntFilter<"Enrollment"> | number
    studentId?: IntFilter<"Enrollment"> | number
    courseId?: IntFilter<"Enrollment"> | number
    academicYearId?: IntFilter<"Enrollment"> | number
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    academicYear?: XOR<AcademicYearScalarRelationFilter, AcademicYearWhereInput>
    grades?: GradeListRelationFilter
  }

  export type EnrollmentOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
    createdAt?: SortOrder
    student?: StudentOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
    academicYear?: AcademicYearOrderByWithRelationInput
    grades?: GradeOrderByRelationAggregateInput
  }

  export type EnrollmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    studentId_academicYearId?: EnrollmentStudentIdAcademicYearIdCompoundUniqueInput
    AND?: EnrollmentWhereInput | EnrollmentWhereInput[]
    OR?: EnrollmentWhereInput[]
    NOT?: EnrollmentWhereInput | EnrollmentWhereInput[]
    studentId?: IntFilter<"Enrollment"> | number
    courseId?: IntFilter<"Enrollment"> | number
    academicYearId?: IntFilter<"Enrollment"> | number
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    academicYear?: XOR<AcademicYearScalarRelationFilter, AcademicYearWhereInput>
    grades?: GradeListRelationFilter
  }, "id" | "studentId_academicYearId">

  export type EnrollmentOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
    createdAt?: SortOrder
    _count?: EnrollmentCountOrderByAggregateInput
    _avg?: EnrollmentAvgOrderByAggregateInput
    _max?: EnrollmentMaxOrderByAggregateInput
    _min?: EnrollmentMinOrderByAggregateInput
    _sum?: EnrollmentSumOrderByAggregateInput
  }

  export type EnrollmentScalarWhereWithAggregatesInput = {
    AND?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    OR?: EnrollmentScalarWhereWithAggregatesInput[]
    NOT?: EnrollmentScalarWhereWithAggregatesInput | EnrollmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Enrollment"> | number
    studentId?: IntWithAggregatesFilter<"Enrollment"> | number
    courseId?: IntWithAggregatesFilter<"Enrollment"> | number
    academicYearId?: IntWithAggregatesFilter<"Enrollment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Enrollment"> | Date | string
  }

  export type SubjectAssignmentWhereInput = {
    AND?: SubjectAssignmentWhereInput | SubjectAssignmentWhereInput[]
    OR?: SubjectAssignmentWhereInput[]
    NOT?: SubjectAssignmentWhereInput | SubjectAssignmentWhereInput[]
    id?: IntFilter<"SubjectAssignment"> | number
    teacherId?: IntFilter<"SubjectAssignment"> | number
    subjectId?: IntFilter<"SubjectAssignment"> | number
    courseId?: IntFilter<"SubjectAssignment"> | number
    academicYearId?: IntFilter<"SubjectAssignment"> | number
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    academicYear?: XOR<AcademicYearScalarRelationFilter, AcademicYearWhereInput>
  }

  export type SubjectAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
    teacher?: TeacherOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
    course?: CourseOrderByWithRelationInput
    academicYear?: AcademicYearOrderByWithRelationInput
  }

  export type SubjectAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    subjectId_courseId_academicYearId?: SubjectAssignmentSubjectIdCourseIdAcademicYearIdCompoundUniqueInput
    AND?: SubjectAssignmentWhereInput | SubjectAssignmentWhereInput[]
    OR?: SubjectAssignmentWhereInput[]
    NOT?: SubjectAssignmentWhereInput | SubjectAssignmentWhereInput[]
    teacherId?: IntFilter<"SubjectAssignment"> | number
    subjectId?: IntFilter<"SubjectAssignment"> | number
    courseId?: IntFilter<"SubjectAssignment"> | number
    academicYearId?: IntFilter<"SubjectAssignment"> | number
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    course?: XOR<CourseScalarRelationFilter, CourseWhereInput>
    academicYear?: XOR<AcademicYearScalarRelationFilter, AcademicYearWhereInput>
  }, "id" | "subjectId_courseId_academicYearId">

  export type SubjectAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
    _count?: SubjectAssignmentCountOrderByAggregateInput
    _avg?: SubjectAssignmentAvgOrderByAggregateInput
    _max?: SubjectAssignmentMaxOrderByAggregateInput
    _min?: SubjectAssignmentMinOrderByAggregateInput
    _sum?: SubjectAssignmentSumOrderByAggregateInput
  }

  export type SubjectAssignmentScalarWhereWithAggregatesInput = {
    AND?: SubjectAssignmentScalarWhereWithAggregatesInput | SubjectAssignmentScalarWhereWithAggregatesInput[]
    OR?: SubjectAssignmentScalarWhereWithAggregatesInput[]
    NOT?: SubjectAssignmentScalarWhereWithAggregatesInput | SubjectAssignmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SubjectAssignment"> | number
    teacherId?: IntWithAggregatesFilter<"SubjectAssignment"> | number
    subjectId?: IntWithAggregatesFilter<"SubjectAssignment"> | number
    courseId?: IntWithAggregatesFilter<"SubjectAssignment"> | number
    academicYearId?: IntWithAggregatesFilter<"SubjectAssignment"> | number
  }

  export type GradeWhereInput = {
    AND?: GradeWhereInput | GradeWhereInput[]
    OR?: GradeWhereInput[]
    NOT?: GradeWhereInput | GradeWhereInput[]
    id?: IntFilter<"Grade"> | number
    score?: IntFilter<"Grade"> | number
    period?: IntFilter<"Grade"> | number
    enrollmentId?: IntFilter<"Grade"> | number
    subjectId?: IntFilter<"Grade"> | number
    updatedAt?: DateTimeFilter<"Grade"> | Date | string
    enrollment?: XOR<EnrollmentScalarRelationFilter, EnrollmentWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
  }

  export type GradeOrderByWithRelationInput = {
    id?: SortOrder
    score?: SortOrder
    period?: SortOrder
    enrollmentId?: SortOrder
    subjectId?: SortOrder
    updatedAt?: SortOrder
    enrollment?: EnrollmentOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
  }

  export type GradeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    enrollmentId_subjectId_period?: GradeEnrollmentIdSubjectIdPeriodCompoundUniqueInput
    AND?: GradeWhereInput | GradeWhereInput[]
    OR?: GradeWhereInput[]
    NOT?: GradeWhereInput | GradeWhereInput[]
    score?: IntFilter<"Grade"> | number
    period?: IntFilter<"Grade"> | number
    enrollmentId?: IntFilter<"Grade"> | number
    subjectId?: IntFilter<"Grade"> | number
    updatedAt?: DateTimeFilter<"Grade"> | Date | string
    enrollment?: XOR<EnrollmentScalarRelationFilter, EnrollmentWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
  }, "id" | "enrollmentId_subjectId_period">

  export type GradeOrderByWithAggregationInput = {
    id?: SortOrder
    score?: SortOrder
    period?: SortOrder
    enrollmentId?: SortOrder
    subjectId?: SortOrder
    updatedAt?: SortOrder
    _count?: GradeCountOrderByAggregateInput
    _avg?: GradeAvgOrderByAggregateInput
    _max?: GradeMaxOrderByAggregateInput
    _min?: GradeMinOrderByAggregateInput
    _sum?: GradeSumOrderByAggregateInput
  }

  export type GradeScalarWhereWithAggregatesInput = {
    AND?: GradeScalarWhereWithAggregatesInput | GradeScalarWhereWithAggregatesInput[]
    OR?: GradeScalarWhereWithAggregatesInput[]
    NOT?: GradeScalarWhereWithAggregatesInput | GradeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Grade"> | number
    score?: IntWithAggregatesFilter<"Grade"> | number
    period?: IntWithAggregatesFilter<"Grade"> | number
    enrollmentId?: IntWithAggregatesFilter<"Grade"> | number
    subjectId?: IntWithAggregatesFilter<"Grade"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"Grade"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    teacher?: TeacherCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    teacher?: TeacherUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherCreateInput = {
    firstName: string
    lastName: string
    user: UserCreateNestedOneWithoutTeacherInput
    assignments?: SubjectAssignmentCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateInput = {
    id?: number
    userId: number
    firstName: string
    lastName: string
    assignments?: SubjectAssignmentUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTeacherNestedInput
    assignments?: SubjectAssignmentUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    assignments?: SubjectAssignmentUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherCreateManyInput = {
    id?: number
    userId: number
    firstName: string
    lastName: string
  }

  export type TeacherUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
  }

  export type TeacherUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
  }

  export type StudentCreateInput = {
    rude: string
    firstName: string
    lastName: string
    birthDate?: Date | string | null
    enrollments?: EnrollmentCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: number
    rude: string
    firstName: string
    lastName: string
    birthDate?: Date | string | null
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    rude?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enrollments?: EnrollmentUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    rude?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    enrollments?: EnrollmentUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: number
    rude: string
    firstName: string
    lastName: string
    birthDate?: Date | string | null
  }

  export type StudentUpdateManyMutationInput = {
    rude?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    rude?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CourseCreateInput = {
    level: string
    parallel: string
    enrollments?: EnrollmentCreateNestedManyWithoutCourseInput
    assignments?: SubjectAssignmentCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateInput = {
    id?: number
    level: string
    parallel: string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput
    assignments?: SubjectAssignmentUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseUpdateInput = {
    level?: StringFieldUpdateOperationsInput | string
    parallel?: StringFieldUpdateOperationsInput | string
    enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput
    assignments?: SubjectAssignmentUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    parallel?: StringFieldUpdateOperationsInput | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput
    assignments?: SubjectAssignmentUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type CourseCreateManyInput = {
    id?: number
    level: string
    parallel: string
  }

  export type CourseUpdateManyMutationInput = {
    level?: StringFieldUpdateOperationsInput | string
    parallel?: StringFieldUpdateOperationsInput | string
  }

  export type CourseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    parallel?: StringFieldUpdateOperationsInput | string
  }

  export type SubjectCreateInput = {
    name: string
    assignments?: SubjectAssignmentCreateNestedManyWithoutSubjectInput
    grades?: GradeCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateInput = {
    id?: number
    name: string
    assignments?: SubjectAssignmentUncheckedCreateNestedManyWithoutSubjectInput
    grades?: GradeUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    assignments?: SubjectAssignmentUpdateManyWithoutSubjectNestedInput
    grades?: GradeUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    assignments?: SubjectAssignmentUncheckedUpdateManyWithoutSubjectNestedInput
    grades?: GradeUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectCreateManyInput = {
    id?: number
    name: string
  }

  export type SubjectUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SubjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AcademicYearCreateInput = {
    year: number
    enrollments?: EnrollmentCreateNestedManyWithoutAcademicYearInput
    assignments?: SubjectAssignmentCreateNestedManyWithoutAcademicYearInput
  }

  export type AcademicYearUncheckedCreateInput = {
    id?: number
    year: number
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutAcademicYearInput
    assignments?: SubjectAssignmentUncheckedCreateNestedManyWithoutAcademicYearInput
  }

  export type AcademicYearUpdateInput = {
    year?: IntFieldUpdateOperationsInput | number
    enrollments?: EnrollmentUpdateManyWithoutAcademicYearNestedInput
    assignments?: SubjectAssignmentUpdateManyWithoutAcademicYearNestedInput
  }

  export type AcademicYearUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    enrollments?: EnrollmentUncheckedUpdateManyWithoutAcademicYearNestedInput
    assignments?: SubjectAssignmentUncheckedUpdateManyWithoutAcademicYearNestedInput
  }

  export type AcademicYearCreateManyInput = {
    id?: number
    year: number
  }

  export type AcademicYearUpdateManyMutationInput = {
    year?: IntFieldUpdateOperationsInput | number
  }

  export type AcademicYearUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
  }

  export type EnrollmentCreateInput = {
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutEnrollmentsInput
    course: CourseCreateNestedOneWithoutEnrollmentsInput
    academicYear: AcademicYearCreateNestedOneWithoutEnrollmentsInput
    grades?: GradeCreateNestedManyWithoutEnrollmentInput
  }

  export type EnrollmentUncheckedCreateInput = {
    id?: number
    studentId: number
    courseId: number
    academicYearId: number
    createdAt?: Date | string
    grades?: GradeUncheckedCreateNestedManyWithoutEnrollmentInput
  }

  export type EnrollmentUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutEnrollmentsNestedInput
    course?: CourseUpdateOneRequiredWithoutEnrollmentsNestedInput
    academicYear?: AcademicYearUpdateOneRequiredWithoutEnrollmentsNestedInput
    grades?: GradeUpdateManyWithoutEnrollmentNestedInput
  }

  export type EnrollmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    grades?: GradeUncheckedUpdateManyWithoutEnrollmentNestedInput
  }

  export type EnrollmentCreateManyInput = {
    id?: number
    studentId: number
    courseId: number
    academicYearId: number
    createdAt?: Date | string
  }

  export type EnrollmentUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectAssignmentCreateInput = {
    teacher: TeacherCreateNestedOneWithoutAssignmentsInput
    subject: SubjectCreateNestedOneWithoutAssignmentsInput
    course: CourseCreateNestedOneWithoutAssignmentsInput
    academicYear: AcademicYearCreateNestedOneWithoutAssignmentsInput
  }

  export type SubjectAssignmentUncheckedCreateInput = {
    id?: number
    teacherId: number
    subjectId: number
    courseId: number
    academicYearId: number
  }

  export type SubjectAssignmentUpdateInput = {
    teacher?: TeacherUpdateOneRequiredWithoutAssignmentsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutAssignmentsNestedInput
    course?: CourseUpdateOneRequiredWithoutAssignmentsNestedInput
    academicYear?: AcademicYearUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type SubjectAssignmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
  }

  export type SubjectAssignmentCreateManyInput = {
    id?: number
    teacherId: number
    subjectId: number
    courseId: number
    academicYearId: number
  }

  export type SubjectAssignmentUpdateManyMutationInput = {

  }

  export type SubjectAssignmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
  }

  export type GradeCreateInput = {
    score: number
    period: number
    updatedAt?: Date | string
    enrollment: EnrollmentCreateNestedOneWithoutGradesInput
    subject: SubjectCreateNestedOneWithoutGradesInput
  }

  export type GradeUncheckedCreateInput = {
    id?: number
    score: number
    period: number
    enrollmentId: number
    subjectId: number
    updatedAt?: Date | string
  }

  export type GradeUpdateInput = {
    score?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollment?: EnrollmentUpdateOneRequiredWithoutGradesNestedInput
    subject?: SubjectUpdateOneRequiredWithoutGradesNestedInput
  }

  export type GradeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    enrollmentId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GradeCreateManyInput = {
    id?: number
    score: number
    period: number
    enrollmentId: number
    subjectId: number
    updatedAt?: Date | string
  }

  export type GradeUpdateManyMutationInput = {
    score?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GradeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    enrollmentId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TeacherNullableScalarRelationFilter = {
    is?: TeacherWhereInput | null
    isNot?: TeacherWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SubjectAssignmentListRelationFilter = {
    every?: SubjectAssignmentWhereInput
    some?: SubjectAssignmentWhereInput
    none?: SubjectAssignmentWhereInput
  }

  export type SubjectAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeacherCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
  }

  export type TeacherAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TeacherMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
  }

  export type TeacherMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
  }

  export type TeacherSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnrollmentListRelationFilter = {
    every?: EnrollmentWhereInput
    some?: EnrollmentWhereInput
    none?: EnrollmentWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EnrollmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    rude?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    rude?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    rude?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    birthDate?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CourseCountOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    parallel?: SortOrder
  }

  export type CourseAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CourseMaxOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    parallel?: SortOrder
  }

  export type CourseMinOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    parallel?: SortOrder
  }

  export type CourseSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GradeListRelationFilter = {
    every?: GradeWhereInput
    some?: GradeWhereInput
    none?: GradeWhereInput
  }

  export type GradeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SubjectAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SubjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SubjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SubjectSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AcademicYearCountOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
  }

  export type AcademicYearAvgOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
  }

  export type AcademicYearMaxOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
  }

  export type AcademicYearMinOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
  }

  export type AcademicYearSumOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type CourseScalarRelationFilter = {
    is?: CourseWhereInput
    isNot?: CourseWhereInput
  }

  export type AcademicYearScalarRelationFilter = {
    is?: AcademicYearWhereInput
    isNot?: AcademicYearWhereInput
  }

  export type EnrollmentStudentIdAcademicYearIdCompoundUniqueInput = {
    studentId: number
    academicYearId: number
  }

  export type EnrollmentCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnrollmentAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
  }

  export type EnrollmentMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnrollmentMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnrollmentSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
  }

  export type TeacherScalarRelationFilter = {
    is?: TeacherWhereInput
    isNot?: TeacherWhereInput
  }

  export type SubjectScalarRelationFilter = {
    is?: SubjectWhereInput
    isNot?: SubjectWhereInput
  }

  export type SubjectAssignmentSubjectIdCourseIdAcademicYearIdCompoundUniqueInput = {
    subjectId: number
    courseId: number
    academicYearId: number
  }

  export type SubjectAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
  }

  export type SubjectAssignmentAvgOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
  }

  export type SubjectAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
  }

  export type SubjectAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
  }

  export type SubjectAssignmentSumOrderByAggregateInput = {
    id?: SortOrder
    teacherId?: SortOrder
    subjectId?: SortOrder
    courseId?: SortOrder
    academicYearId?: SortOrder
  }

  export type EnrollmentScalarRelationFilter = {
    is?: EnrollmentWhereInput
    isNot?: EnrollmentWhereInput
  }

  export type GradeEnrollmentIdSubjectIdPeriodCompoundUniqueInput = {
    enrollmentId: number
    subjectId: number
    period: number
  }

  export type GradeCountOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    period?: SortOrder
    enrollmentId?: SortOrder
    subjectId?: SortOrder
    updatedAt?: SortOrder
  }

  export type GradeAvgOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    period?: SortOrder
    enrollmentId?: SortOrder
    subjectId?: SortOrder
  }

  export type GradeMaxOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    period?: SortOrder
    enrollmentId?: SortOrder
    subjectId?: SortOrder
    updatedAt?: SortOrder
  }

  export type GradeMinOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    period?: SortOrder
    enrollmentId?: SortOrder
    subjectId?: SortOrder
    updatedAt?: SortOrder
  }

  export type GradeSumOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    period?: SortOrder
    enrollmentId?: SortOrder
    subjectId?: SortOrder
  }

  export type TeacherCreateNestedOneWithoutUserInput = {
    create?: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutUserInput
    connect?: TeacherWhereUniqueInput
  }

  export type TeacherUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutUserInput
    connect?: TeacherWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TeacherUpdateOneWithoutUserNestedInput = {
    create?: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutUserInput
    upsert?: TeacherUpsertWithoutUserInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutUserInput, TeacherUpdateWithoutUserInput>, TeacherUncheckedUpdateWithoutUserInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TeacherUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutUserInput
    upsert?: TeacherUpsertWithoutUserInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutUserInput, TeacherUpdateWithoutUserInput>, TeacherUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutTeacherInput = {
    create?: XOR<UserCreateWithoutTeacherInput, UserUncheckedCreateWithoutTeacherInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeacherInput
    connect?: UserWhereUniqueInput
  }

  export type SubjectAssignmentCreateNestedManyWithoutTeacherInput = {
    create?: XOR<SubjectAssignmentCreateWithoutTeacherInput, SubjectAssignmentUncheckedCreateWithoutTeacherInput> | SubjectAssignmentCreateWithoutTeacherInput[] | SubjectAssignmentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutTeacherInput | SubjectAssignmentCreateOrConnectWithoutTeacherInput[]
    createMany?: SubjectAssignmentCreateManyTeacherInputEnvelope
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
  }

  export type SubjectAssignmentUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<SubjectAssignmentCreateWithoutTeacherInput, SubjectAssignmentUncheckedCreateWithoutTeacherInput> | SubjectAssignmentCreateWithoutTeacherInput[] | SubjectAssignmentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutTeacherInput | SubjectAssignmentCreateOrConnectWithoutTeacherInput[]
    createMany?: SubjectAssignmentCreateManyTeacherInputEnvelope
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutTeacherNestedInput = {
    create?: XOR<UserCreateWithoutTeacherInput, UserUncheckedCreateWithoutTeacherInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeacherInput
    upsert?: UserUpsertWithoutTeacherInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTeacherInput, UserUpdateWithoutTeacherInput>, UserUncheckedUpdateWithoutTeacherInput>
  }

  export type SubjectAssignmentUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<SubjectAssignmentCreateWithoutTeacherInput, SubjectAssignmentUncheckedCreateWithoutTeacherInput> | SubjectAssignmentCreateWithoutTeacherInput[] | SubjectAssignmentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutTeacherInput | SubjectAssignmentCreateOrConnectWithoutTeacherInput[]
    upsert?: SubjectAssignmentUpsertWithWhereUniqueWithoutTeacherInput | SubjectAssignmentUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: SubjectAssignmentCreateManyTeacherInputEnvelope
    set?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    disconnect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    delete?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    update?: SubjectAssignmentUpdateWithWhereUniqueWithoutTeacherInput | SubjectAssignmentUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: SubjectAssignmentUpdateManyWithWhereWithoutTeacherInput | SubjectAssignmentUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: SubjectAssignmentScalarWhereInput | SubjectAssignmentScalarWhereInput[]
  }

  export type SubjectAssignmentUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<SubjectAssignmentCreateWithoutTeacherInput, SubjectAssignmentUncheckedCreateWithoutTeacherInput> | SubjectAssignmentCreateWithoutTeacherInput[] | SubjectAssignmentUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutTeacherInput | SubjectAssignmentCreateOrConnectWithoutTeacherInput[]
    upsert?: SubjectAssignmentUpsertWithWhereUniqueWithoutTeacherInput | SubjectAssignmentUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: SubjectAssignmentCreateManyTeacherInputEnvelope
    set?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    disconnect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    delete?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    update?: SubjectAssignmentUpdateWithWhereUniqueWithoutTeacherInput | SubjectAssignmentUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: SubjectAssignmentUpdateManyWithWhereWithoutTeacherInput | SubjectAssignmentUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: SubjectAssignmentScalarWhereInput | SubjectAssignmentScalarWhereInput[]
  }

  export type EnrollmentCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnrollmentUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput> | EnrollmentCreateWithoutStudentInput[] | EnrollmentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutStudentInput | EnrollmentCreateOrConnectWithoutStudentInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutStudentInput | EnrollmentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: EnrollmentCreateManyStudentInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutStudentInput | EnrollmentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutStudentInput | EnrollmentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type EnrollmentCreateNestedManyWithoutCourseInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type SubjectAssignmentCreateNestedManyWithoutCourseInput = {
    create?: XOR<SubjectAssignmentCreateWithoutCourseInput, SubjectAssignmentUncheckedCreateWithoutCourseInput> | SubjectAssignmentCreateWithoutCourseInput[] | SubjectAssignmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutCourseInput | SubjectAssignmentCreateOrConnectWithoutCourseInput[]
    createMany?: SubjectAssignmentCreateManyCourseInputEnvelope
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type SubjectAssignmentUncheckedCreateNestedManyWithoutCourseInput = {
    create?: XOR<SubjectAssignmentCreateWithoutCourseInput, SubjectAssignmentUncheckedCreateWithoutCourseInput> | SubjectAssignmentCreateWithoutCourseInput[] | SubjectAssignmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutCourseInput | SubjectAssignmentCreateOrConnectWithoutCourseInput[]
    createMany?: SubjectAssignmentCreateManyCourseInputEnvelope
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
  }

  export type EnrollmentUpdateManyWithoutCourseNestedInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutCourseInput | EnrollmentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutCourseInput | EnrollmentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutCourseInput | EnrollmentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type SubjectAssignmentUpdateManyWithoutCourseNestedInput = {
    create?: XOR<SubjectAssignmentCreateWithoutCourseInput, SubjectAssignmentUncheckedCreateWithoutCourseInput> | SubjectAssignmentCreateWithoutCourseInput[] | SubjectAssignmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutCourseInput | SubjectAssignmentCreateOrConnectWithoutCourseInput[]
    upsert?: SubjectAssignmentUpsertWithWhereUniqueWithoutCourseInput | SubjectAssignmentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: SubjectAssignmentCreateManyCourseInputEnvelope
    set?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    disconnect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    delete?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    update?: SubjectAssignmentUpdateWithWhereUniqueWithoutCourseInput | SubjectAssignmentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: SubjectAssignmentUpdateManyWithWhereWithoutCourseInput | SubjectAssignmentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: SubjectAssignmentScalarWhereInput | SubjectAssignmentScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput> | EnrollmentCreateWithoutCourseInput[] | EnrollmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutCourseInput | EnrollmentCreateOrConnectWithoutCourseInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutCourseInput | EnrollmentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: EnrollmentCreateManyCourseInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutCourseInput | EnrollmentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutCourseInput | EnrollmentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type SubjectAssignmentUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: XOR<SubjectAssignmentCreateWithoutCourseInput, SubjectAssignmentUncheckedCreateWithoutCourseInput> | SubjectAssignmentCreateWithoutCourseInput[] | SubjectAssignmentUncheckedCreateWithoutCourseInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutCourseInput | SubjectAssignmentCreateOrConnectWithoutCourseInput[]
    upsert?: SubjectAssignmentUpsertWithWhereUniqueWithoutCourseInput | SubjectAssignmentUpsertWithWhereUniqueWithoutCourseInput[]
    createMany?: SubjectAssignmentCreateManyCourseInputEnvelope
    set?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    disconnect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    delete?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    update?: SubjectAssignmentUpdateWithWhereUniqueWithoutCourseInput | SubjectAssignmentUpdateWithWhereUniqueWithoutCourseInput[]
    updateMany?: SubjectAssignmentUpdateManyWithWhereWithoutCourseInput | SubjectAssignmentUpdateManyWithWhereWithoutCourseInput[]
    deleteMany?: SubjectAssignmentScalarWhereInput | SubjectAssignmentScalarWhereInput[]
  }

  export type SubjectAssignmentCreateNestedManyWithoutSubjectInput = {
    create?: XOR<SubjectAssignmentCreateWithoutSubjectInput, SubjectAssignmentUncheckedCreateWithoutSubjectInput> | SubjectAssignmentCreateWithoutSubjectInput[] | SubjectAssignmentUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutSubjectInput | SubjectAssignmentCreateOrConnectWithoutSubjectInput[]
    createMany?: SubjectAssignmentCreateManySubjectInputEnvelope
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
  }

  export type GradeCreateNestedManyWithoutSubjectInput = {
    create?: XOR<GradeCreateWithoutSubjectInput, GradeUncheckedCreateWithoutSubjectInput> | GradeCreateWithoutSubjectInput[] | GradeUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: GradeCreateOrConnectWithoutSubjectInput | GradeCreateOrConnectWithoutSubjectInput[]
    createMany?: GradeCreateManySubjectInputEnvelope
    connect?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
  }

  export type SubjectAssignmentUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<SubjectAssignmentCreateWithoutSubjectInput, SubjectAssignmentUncheckedCreateWithoutSubjectInput> | SubjectAssignmentCreateWithoutSubjectInput[] | SubjectAssignmentUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutSubjectInput | SubjectAssignmentCreateOrConnectWithoutSubjectInput[]
    createMany?: SubjectAssignmentCreateManySubjectInputEnvelope
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
  }

  export type GradeUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<GradeCreateWithoutSubjectInput, GradeUncheckedCreateWithoutSubjectInput> | GradeCreateWithoutSubjectInput[] | GradeUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: GradeCreateOrConnectWithoutSubjectInput | GradeCreateOrConnectWithoutSubjectInput[]
    createMany?: GradeCreateManySubjectInputEnvelope
    connect?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
  }

  export type SubjectAssignmentUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<SubjectAssignmentCreateWithoutSubjectInput, SubjectAssignmentUncheckedCreateWithoutSubjectInput> | SubjectAssignmentCreateWithoutSubjectInput[] | SubjectAssignmentUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutSubjectInput | SubjectAssignmentCreateOrConnectWithoutSubjectInput[]
    upsert?: SubjectAssignmentUpsertWithWhereUniqueWithoutSubjectInput | SubjectAssignmentUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: SubjectAssignmentCreateManySubjectInputEnvelope
    set?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    disconnect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    delete?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    update?: SubjectAssignmentUpdateWithWhereUniqueWithoutSubjectInput | SubjectAssignmentUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: SubjectAssignmentUpdateManyWithWhereWithoutSubjectInput | SubjectAssignmentUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: SubjectAssignmentScalarWhereInput | SubjectAssignmentScalarWhereInput[]
  }

  export type GradeUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<GradeCreateWithoutSubjectInput, GradeUncheckedCreateWithoutSubjectInput> | GradeCreateWithoutSubjectInput[] | GradeUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: GradeCreateOrConnectWithoutSubjectInput | GradeCreateOrConnectWithoutSubjectInput[]
    upsert?: GradeUpsertWithWhereUniqueWithoutSubjectInput | GradeUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: GradeCreateManySubjectInputEnvelope
    set?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    disconnect?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    delete?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    connect?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    update?: GradeUpdateWithWhereUniqueWithoutSubjectInput | GradeUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: GradeUpdateManyWithWhereWithoutSubjectInput | GradeUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: GradeScalarWhereInput | GradeScalarWhereInput[]
  }

  export type SubjectAssignmentUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<SubjectAssignmentCreateWithoutSubjectInput, SubjectAssignmentUncheckedCreateWithoutSubjectInput> | SubjectAssignmentCreateWithoutSubjectInput[] | SubjectAssignmentUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutSubjectInput | SubjectAssignmentCreateOrConnectWithoutSubjectInput[]
    upsert?: SubjectAssignmentUpsertWithWhereUniqueWithoutSubjectInput | SubjectAssignmentUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: SubjectAssignmentCreateManySubjectInputEnvelope
    set?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    disconnect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    delete?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    update?: SubjectAssignmentUpdateWithWhereUniqueWithoutSubjectInput | SubjectAssignmentUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: SubjectAssignmentUpdateManyWithWhereWithoutSubjectInput | SubjectAssignmentUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: SubjectAssignmentScalarWhereInput | SubjectAssignmentScalarWhereInput[]
  }

  export type GradeUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<GradeCreateWithoutSubjectInput, GradeUncheckedCreateWithoutSubjectInput> | GradeCreateWithoutSubjectInput[] | GradeUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: GradeCreateOrConnectWithoutSubjectInput | GradeCreateOrConnectWithoutSubjectInput[]
    upsert?: GradeUpsertWithWhereUniqueWithoutSubjectInput | GradeUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: GradeCreateManySubjectInputEnvelope
    set?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    disconnect?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    delete?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    connect?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    update?: GradeUpdateWithWhereUniqueWithoutSubjectInput | GradeUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: GradeUpdateManyWithWhereWithoutSubjectInput | GradeUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: GradeScalarWhereInput | GradeScalarWhereInput[]
  }

  export type EnrollmentCreateNestedManyWithoutAcademicYearInput = {
    create?: XOR<EnrollmentCreateWithoutAcademicYearInput, EnrollmentUncheckedCreateWithoutAcademicYearInput> | EnrollmentCreateWithoutAcademicYearInput[] | EnrollmentUncheckedCreateWithoutAcademicYearInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutAcademicYearInput | EnrollmentCreateOrConnectWithoutAcademicYearInput[]
    createMany?: EnrollmentCreateManyAcademicYearInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type SubjectAssignmentCreateNestedManyWithoutAcademicYearInput = {
    create?: XOR<SubjectAssignmentCreateWithoutAcademicYearInput, SubjectAssignmentUncheckedCreateWithoutAcademicYearInput> | SubjectAssignmentCreateWithoutAcademicYearInput[] | SubjectAssignmentUncheckedCreateWithoutAcademicYearInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutAcademicYearInput | SubjectAssignmentCreateOrConnectWithoutAcademicYearInput[]
    createMany?: SubjectAssignmentCreateManyAcademicYearInputEnvelope
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
  }

  export type EnrollmentUncheckedCreateNestedManyWithoutAcademicYearInput = {
    create?: XOR<EnrollmentCreateWithoutAcademicYearInput, EnrollmentUncheckedCreateWithoutAcademicYearInput> | EnrollmentCreateWithoutAcademicYearInput[] | EnrollmentUncheckedCreateWithoutAcademicYearInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutAcademicYearInput | EnrollmentCreateOrConnectWithoutAcademicYearInput[]
    createMany?: EnrollmentCreateManyAcademicYearInputEnvelope
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
  }

  export type SubjectAssignmentUncheckedCreateNestedManyWithoutAcademicYearInput = {
    create?: XOR<SubjectAssignmentCreateWithoutAcademicYearInput, SubjectAssignmentUncheckedCreateWithoutAcademicYearInput> | SubjectAssignmentCreateWithoutAcademicYearInput[] | SubjectAssignmentUncheckedCreateWithoutAcademicYearInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutAcademicYearInput | SubjectAssignmentCreateOrConnectWithoutAcademicYearInput[]
    createMany?: SubjectAssignmentCreateManyAcademicYearInputEnvelope
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
  }

  export type EnrollmentUpdateManyWithoutAcademicYearNestedInput = {
    create?: XOR<EnrollmentCreateWithoutAcademicYearInput, EnrollmentUncheckedCreateWithoutAcademicYearInput> | EnrollmentCreateWithoutAcademicYearInput[] | EnrollmentUncheckedCreateWithoutAcademicYearInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutAcademicYearInput | EnrollmentCreateOrConnectWithoutAcademicYearInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutAcademicYearInput | EnrollmentUpsertWithWhereUniqueWithoutAcademicYearInput[]
    createMany?: EnrollmentCreateManyAcademicYearInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutAcademicYearInput | EnrollmentUpdateWithWhereUniqueWithoutAcademicYearInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutAcademicYearInput | EnrollmentUpdateManyWithWhereWithoutAcademicYearInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type SubjectAssignmentUpdateManyWithoutAcademicYearNestedInput = {
    create?: XOR<SubjectAssignmentCreateWithoutAcademicYearInput, SubjectAssignmentUncheckedCreateWithoutAcademicYearInput> | SubjectAssignmentCreateWithoutAcademicYearInput[] | SubjectAssignmentUncheckedCreateWithoutAcademicYearInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutAcademicYearInput | SubjectAssignmentCreateOrConnectWithoutAcademicYearInput[]
    upsert?: SubjectAssignmentUpsertWithWhereUniqueWithoutAcademicYearInput | SubjectAssignmentUpsertWithWhereUniqueWithoutAcademicYearInput[]
    createMany?: SubjectAssignmentCreateManyAcademicYearInputEnvelope
    set?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    disconnect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    delete?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    update?: SubjectAssignmentUpdateWithWhereUniqueWithoutAcademicYearInput | SubjectAssignmentUpdateWithWhereUniqueWithoutAcademicYearInput[]
    updateMany?: SubjectAssignmentUpdateManyWithWhereWithoutAcademicYearInput | SubjectAssignmentUpdateManyWithWhereWithoutAcademicYearInput[]
    deleteMany?: SubjectAssignmentScalarWhereInput | SubjectAssignmentScalarWhereInput[]
  }

  export type EnrollmentUncheckedUpdateManyWithoutAcademicYearNestedInput = {
    create?: XOR<EnrollmentCreateWithoutAcademicYearInput, EnrollmentUncheckedCreateWithoutAcademicYearInput> | EnrollmentCreateWithoutAcademicYearInput[] | EnrollmentUncheckedCreateWithoutAcademicYearInput[]
    connectOrCreate?: EnrollmentCreateOrConnectWithoutAcademicYearInput | EnrollmentCreateOrConnectWithoutAcademicYearInput[]
    upsert?: EnrollmentUpsertWithWhereUniqueWithoutAcademicYearInput | EnrollmentUpsertWithWhereUniqueWithoutAcademicYearInput[]
    createMany?: EnrollmentCreateManyAcademicYearInputEnvelope
    set?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    disconnect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    delete?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    connect?: EnrollmentWhereUniqueInput | EnrollmentWhereUniqueInput[]
    update?: EnrollmentUpdateWithWhereUniqueWithoutAcademicYearInput | EnrollmentUpdateWithWhereUniqueWithoutAcademicYearInput[]
    updateMany?: EnrollmentUpdateManyWithWhereWithoutAcademicYearInput | EnrollmentUpdateManyWithWhereWithoutAcademicYearInput[]
    deleteMany?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
  }

  export type SubjectAssignmentUncheckedUpdateManyWithoutAcademicYearNestedInput = {
    create?: XOR<SubjectAssignmentCreateWithoutAcademicYearInput, SubjectAssignmentUncheckedCreateWithoutAcademicYearInput> | SubjectAssignmentCreateWithoutAcademicYearInput[] | SubjectAssignmentUncheckedCreateWithoutAcademicYearInput[]
    connectOrCreate?: SubjectAssignmentCreateOrConnectWithoutAcademicYearInput | SubjectAssignmentCreateOrConnectWithoutAcademicYearInput[]
    upsert?: SubjectAssignmentUpsertWithWhereUniqueWithoutAcademicYearInput | SubjectAssignmentUpsertWithWhereUniqueWithoutAcademicYearInput[]
    createMany?: SubjectAssignmentCreateManyAcademicYearInputEnvelope
    set?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    disconnect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    delete?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    connect?: SubjectAssignmentWhereUniqueInput | SubjectAssignmentWhereUniqueInput[]
    update?: SubjectAssignmentUpdateWithWhereUniqueWithoutAcademicYearInput | SubjectAssignmentUpdateWithWhereUniqueWithoutAcademicYearInput[]
    updateMany?: SubjectAssignmentUpdateManyWithWhereWithoutAcademicYearInput | SubjectAssignmentUpdateManyWithWhereWithoutAcademicYearInput[]
    deleteMany?: SubjectAssignmentScalarWhereInput | SubjectAssignmentScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<StudentCreateWithoutEnrollmentsInput, StudentUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentsInput
    connect?: StudentWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutEnrollmentsInput
    connect?: CourseWhereUniqueInput
  }

  export type AcademicYearCreateNestedOneWithoutEnrollmentsInput = {
    create?: XOR<AcademicYearCreateWithoutEnrollmentsInput, AcademicYearUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: AcademicYearCreateOrConnectWithoutEnrollmentsInput
    connect?: AcademicYearWhereUniqueInput
  }

  export type GradeCreateNestedManyWithoutEnrollmentInput = {
    create?: XOR<GradeCreateWithoutEnrollmentInput, GradeUncheckedCreateWithoutEnrollmentInput> | GradeCreateWithoutEnrollmentInput[] | GradeUncheckedCreateWithoutEnrollmentInput[]
    connectOrCreate?: GradeCreateOrConnectWithoutEnrollmentInput | GradeCreateOrConnectWithoutEnrollmentInput[]
    createMany?: GradeCreateManyEnrollmentInputEnvelope
    connect?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
  }

  export type GradeUncheckedCreateNestedManyWithoutEnrollmentInput = {
    create?: XOR<GradeCreateWithoutEnrollmentInput, GradeUncheckedCreateWithoutEnrollmentInput> | GradeCreateWithoutEnrollmentInput[] | GradeUncheckedCreateWithoutEnrollmentInput[]
    connectOrCreate?: GradeCreateOrConnectWithoutEnrollmentInput | GradeCreateOrConnectWithoutEnrollmentInput[]
    createMany?: GradeCreateManyEnrollmentInputEnvelope
    connect?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
  }

  export type StudentUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<StudentCreateWithoutEnrollmentsInput, StudentUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEnrollmentsInput
    upsert?: StudentUpsertWithoutEnrollmentsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutEnrollmentsInput, StudentUpdateWithoutEnrollmentsInput>, StudentUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type CourseUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutEnrollmentsInput
    upsert?: CourseUpsertWithoutEnrollmentsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutEnrollmentsInput, CourseUpdateWithoutEnrollmentsInput>, CourseUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type AcademicYearUpdateOneRequiredWithoutEnrollmentsNestedInput = {
    create?: XOR<AcademicYearCreateWithoutEnrollmentsInput, AcademicYearUncheckedCreateWithoutEnrollmentsInput>
    connectOrCreate?: AcademicYearCreateOrConnectWithoutEnrollmentsInput
    upsert?: AcademicYearUpsertWithoutEnrollmentsInput
    connect?: AcademicYearWhereUniqueInput
    update?: XOR<XOR<AcademicYearUpdateToOneWithWhereWithoutEnrollmentsInput, AcademicYearUpdateWithoutEnrollmentsInput>, AcademicYearUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type GradeUpdateManyWithoutEnrollmentNestedInput = {
    create?: XOR<GradeCreateWithoutEnrollmentInput, GradeUncheckedCreateWithoutEnrollmentInput> | GradeCreateWithoutEnrollmentInput[] | GradeUncheckedCreateWithoutEnrollmentInput[]
    connectOrCreate?: GradeCreateOrConnectWithoutEnrollmentInput | GradeCreateOrConnectWithoutEnrollmentInput[]
    upsert?: GradeUpsertWithWhereUniqueWithoutEnrollmentInput | GradeUpsertWithWhereUniqueWithoutEnrollmentInput[]
    createMany?: GradeCreateManyEnrollmentInputEnvelope
    set?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    disconnect?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    delete?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    connect?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    update?: GradeUpdateWithWhereUniqueWithoutEnrollmentInput | GradeUpdateWithWhereUniqueWithoutEnrollmentInput[]
    updateMany?: GradeUpdateManyWithWhereWithoutEnrollmentInput | GradeUpdateManyWithWhereWithoutEnrollmentInput[]
    deleteMany?: GradeScalarWhereInput | GradeScalarWhereInput[]
  }

  export type GradeUncheckedUpdateManyWithoutEnrollmentNestedInput = {
    create?: XOR<GradeCreateWithoutEnrollmentInput, GradeUncheckedCreateWithoutEnrollmentInput> | GradeCreateWithoutEnrollmentInput[] | GradeUncheckedCreateWithoutEnrollmentInput[]
    connectOrCreate?: GradeCreateOrConnectWithoutEnrollmentInput | GradeCreateOrConnectWithoutEnrollmentInput[]
    upsert?: GradeUpsertWithWhereUniqueWithoutEnrollmentInput | GradeUpsertWithWhereUniqueWithoutEnrollmentInput[]
    createMany?: GradeCreateManyEnrollmentInputEnvelope
    set?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    disconnect?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    delete?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    connect?: GradeWhereUniqueInput | GradeWhereUniqueInput[]
    update?: GradeUpdateWithWhereUniqueWithoutEnrollmentInput | GradeUpdateWithWhereUniqueWithoutEnrollmentInput[]
    updateMany?: GradeUpdateManyWithWhereWithoutEnrollmentInput | GradeUpdateManyWithWhereWithoutEnrollmentInput[]
    deleteMany?: GradeScalarWhereInput | GradeScalarWhereInput[]
  }

  export type TeacherCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<TeacherCreateWithoutAssignmentsInput, TeacherUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutAssignmentsInput
    connect?: TeacherWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<SubjectCreateWithoutAssignmentsInput, SubjectUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutAssignmentsInput
    connect?: SubjectWhereUniqueInput
  }

  export type CourseCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<CourseCreateWithoutAssignmentsInput, CourseUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutAssignmentsInput
    connect?: CourseWhereUniqueInput
  }

  export type AcademicYearCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<AcademicYearCreateWithoutAssignmentsInput, AcademicYearUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: AcademicYearCreateOrConnectWithoutAssignmentsInput
    connect?: AcademicYearWhereUniqueInput
  }

  export type TeacherUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<TeacherCreateWithoutAssignmentsInput, TeacherUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutAssignmentsInput
    upsert?: TeacherUpsertWithoutAssignmentsInput
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutAssignmentsInput, TeacherUpdateWithoutAssignmentsInput>, TeacherUncheckedUpdateWithoutAssignmentsInput>
  }

  export type SubjectUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<SubjectCreateWithoutAssignmentsInput, SubjectUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutAssignmentsInput
    upsert?: SubjectUpsertWithoutAssignmentsInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutAssignmentsInput, SubjectUpdateWithoutAssignmentsInput>, SubjectUncheckedUpdateWithoutAssignmentsInput>
  }

  export type CourseUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<CourseCreateWithoutAssignmentsInput, CourseUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: CourseCreateOrConnectWithoutAssignmentsInput
    upsert?: CourseUpsertWithoutAssignmentsInput
    connect?: CourseWhereUniqueInput
    update?: XOR<XOR<CourseUpdateToOneWithWhereWithoutAssignmentsInput, CourseUpdateWithoutAssignmentsInput>, CourseUncheckedUpdateWithoutAssignmentsInput>
  }

  export type AcademicYearUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<AcademicYearCreateWithoutAssignmentsInput, AcademicYearUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: AcademicYearCreateOrConnectWithoutAssignmentsInput
    upsert?: AcademicYearUpsertWithoutAssignmentsInput
    connect?: AcademicYearWhereUniqueInput
    update?: XOR<XOR<AcademicYearUpdateToOneWithWhereWithoutAssignmentsInput, AcademicYearUpdateWithoutAssignmentsInput>, AcademicYearUncheckedUpdateWithoutAssignmentsInput>
  }

  export type EnrollmentCreateNestedOneWithoutGradesInput = {
    create?: XOR<EnrollmentCreateWithoutGradesInput, EnrollmentUncheckedCreateWithoutGradesInput>
    connectOrCreate?: EnrollmentCreateOrConnectWithoutGradesInput
    connect?: EnrollmentWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutGradesInput = {
    create?: XOR<SubjectCreateWithoutGradesInput, SubjectUncheckedCreateWithoutGradesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutGradesInput
    connect?: SubjectWhereUniqueInput
  }

  export type EnrollmentUpdateOneRequiredWithoutGradesNestedInput = {
    create?: XOR<EnrollmentCreateWithoutGradesInput, EnrollmentUncheckedCreateWithoutGradesInput>
    connectOrCreate?: EnrollmentCreateOrConnectWithoutGradesInput
    upsert?: EnrollmentUpsertWithoutGradesInput
    connect?: EnrollmentWhereUniqueInput
    update?: XOR<XOR<EnrollmentUpdateToOneWithWhereWithoutGradesInput, EnrollmentUpdateWithoutGradesInput>, EnrollmentUncheckedUpdateWithoutGradesInput>
  }

  export type SubjectUpdateOneRequiredWithoutGradesNestedInput = {
    create?: XOR<SubjectCreateWithoutGradesInput, SubjectUncheckedCreateWithoutGradesInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutGradesInput
    upsert?: SubjectUpsertWithoutGradesInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutGradesInput, SubjectUpdateWithoutGradesInput>, SubjectUncheckedUpdateWithoutGradesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TeacherCreateWithoutUserInput = {
    firstName: string
    lastName: string
    assignments?: SubjectAssignmentCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutUserInput = {
    id?: number
    firstName: string
    lastName: string
    assignments?: SubjectAssignmentUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutUserInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
  }

  export type TeacherUpsertWithoutUserInput = {
    update: XOR<TeacherUpdateWithoutUserInput, TeacherUncheckedUpdateWithoutUserInput>
    create: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutUserInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutUserInput, TeacherUncheckedUpdateWithoutUserInput>
  }

  export type TeacherUpdateWithoutUserInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    assignments?: SubjectAssignmentUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    assignments?: SubjectAssignmentUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type UserCreateWithoutTeacherInput = {
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutTeacherInput = {
    id?: number
    email: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutTeacherInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTeacherInput, UserUncheckedCreateWithoutTeacherInput>
  }

  export type SubjectAssignmentCreateWithoutTeacherInput = {
    subject: SubjectCreateNestedOneWithoutAssignmentsInput
    course: CourseCreateNestedOneWithoutAssignmentsInput
    academicYear: AcademicYearCreateNestedOneWithoutAssignmentsInput
  }

  export type SubjectAssignmentUncheckedCreateWithoutTeacherInput = {
    id?: number
    subjectId: number
    courseId: number
    academicYearId: number
  }

  export type SubjectAssignmentCreateOrConnectWithoutTeacherInput = {
    where: SubjectAssignmentWhereUniqueInput
    create: XOR<SubjectAssignmentCreateWithoutTeacherInput, SubjectAssignmentUncheckedCreateWithoutTeacherInput>
  }

  export type SubjectAssignmentCreateManyTeacherInputEnvelope = {
    data: SubjectAssignmentCreateManyTeacherInput | SubjectAssignmentCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTeacherInput = {
    update: XOR<UserUpdateWithoutTeacherInput, UserUncheckedUpdateWithoutTeacherInput>
    create: XOR<UserCreateWithoutTeacherInput, UserUncheckedCreateWithoutTeacherInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTeacherInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTeacherInput, UserUncheckedUpdateWithoutTeacherInput>
  }

  export type UserUpdateWithoutTeacherInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectAssignmentUpsertWithWhereUniqueWithoutTeacherInput = {
    where: SubjectAssignmentWhereUniqueInput
    update: XOR<SubjectAssignmentUpdateWithoutTeacherInput, SubjectAssignmentUncheckedUpdateWithoutTeacherInput>
    create: XOR<SubjectAssignmentCreateWithoutTeacherInput, SubjectAssignmentUncheckedCreateWithoutTeacherInput>
  }

  export type SubjectAssignmentUpdateWithWhereUniqueWithoutTeacherInput = {
    where: SubjectAssignmentWhereUniqueInput
    data: XOR<SubjectAssignmentUpdateWithoutTeacherInput, SubjectAssignmentUncheckedUpdateWithoutTeacherInput>
  }

  export type SubjectAssignmentUpdateManyWithWhereWithoutTeacherInput = {
    where: SubjectAssignmentScalarWhereInput
    data: XOR<SubjectAssignmentUpdateManyMutationInput, SubjectAssignmentUncheckedUpdateManyWithoutTeacherInput>
  }

  export type SubjectAssignmentScalarWhereInput = {
    AND?: SubjectAssignmentScalarWhereInput | SubjectAssignmentScalarWhereInput[]
    OR?: SubjectAssignmentScalarWhereInput[]
    NOT?: SubjectAssignmentScalarWhereInput | SubjectAssignmentScalarWhereInput[]
    id?: IntFilter<"SubjectAssignment"> | number
    teacherId?: IntFilter<"SubjectAssignment"> | number
    subjectId?: IntFilter<"SubjectAssignment"> | number
    courseId?: IntFilter<"SubjectAssignment"> | number
    academicYearId?: IntFilter<"SubjectAssignment"> | number
  }

  export type EnrollmentCreateWithoutStudentInput = {
    createdAt?: Date | string
    course: CourseCreateNestedOneWithoutEnrollmentsInput
    academicYear: AcademicYearCreateNestedOneWithoutEnrollmentsInput
    grades?: GradeCreateNestedManyWithoutEnrollmentInput
  }

  export type EnrollmentUncheckedCreateWithoutStudentInput = {
    id?: number
    courseId: number
    academicYearId: number
    createdAt?: Date | string
    grades?: GradeUncheckedCreateNestedManyWithoutEnrollmentInput
  }

  export type EnrollmentCreateOrConnectWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentCreateManyStudentInputEnvelope = {
    data: EnrollmentCreateManyStudentInput | EnrollmentCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
    create: XOR<EnrollmentCreateWithoutStudentInput, EnrollmentUncheckedCreateWithoutStudentInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutStudentInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutStudentInput, EnrollmentUncheckedUpdateWithoutStudentInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutStudentInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutStudentInput>
  }

  export type EnrollmentScalarWhereInput = {
    AND?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    OR?: EnrollmentScalarWhereInput[]
    NOT?: EnrollmentScalarWhereInput | EnrollmentScalarWhereInput[]
    id?: IntFilter<"Enrollment"> | number
    studentId?: IntFilter<"Enrollment"> | number
    courseId?: IntFilter<"Enrollment"> | number
    academicYearId?: IntFilter<"Enrollment"> | number
    createdAt?: DateTimeFilter<"Enrollment"> | Date | string
  }

  export type EnrollmentCreateWithoutCourseInput = {
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutEnrollmentsInput
    academicYear: AcademicYearCreateNestedOneWithoutEnrollmentsInput
    grades?: GradeCreateNestedManyWithoutEnrollmentInput
  }

  export type EnrollmentUncheckedCreateWithoutCourseInput = {
    id?: number
    studentId: number
    academicYearId: number
    createdAt?: Date | string
    grades?: GradeUncheckedCreateNestedManyWithoutEnrollmentInput
  }

  export type EnrollmentCreateOrConnectWithoutCourseInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput>
  }

  export type EnrollmentCreateManyCourseInputEnvelope = {
    data: EnrollmentCreateManyCourseInput | EnrollmentCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type SubjectAssignmentCreateWithoutCourseInput = {
    teacher: TeacherCreateNestedOneWithoutAssignmentsInput
    subject: SubjectCreateNestedOneWithoutAssignmentsInput
    academicYear: AcademicYearCreateNestedOneWithoutAssignmentsInput
  }

  export type SubjectAssignmentUncheckedCreateWithoutCourseInput = {
    id?: number
    teacherId: number
    subjectId: number
    academicYearId: number
  }

  export type SubjectAssignmentCreateOrConnectWithoutCourseInput = {
    where: SubjectAssignmentWhereUniqueInput
    create: XOR<SubjectAssignmentCreateWithoutCourseInput, SubjectAssignmentUncheckedCreateWithoutCourseInput>
  }

  export type SubjectAssignmentCreateManyCourseInputEnvelope = {
    data: SubjectAssignmentCreateManyCourseInput | SubjectAssignmentCreateManyCourseInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutCourseInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutCourseInput, EnrollmentUncheckedUpdateWithoutCourseInput>
    create: XOR<EnrollmentCreateWithoutCourseInput, EnrollmentUncheckedCreateWithoutCourseInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutCourseInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutCourseInput, EnrollmentUncheckedUpdateWithoutCourseInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutCourseInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutCourseInput>
  }

  export type SubjectAssignmentUpsertWithWhereUniqueWithoutCourseInput = {
    where: SubjectAssignmentWhereUniqueInput
    update: XOR<SubjectAssignmentUpdateWithoutCourseInput, SubjectAssignmentUncheckedUpdateWithoutCourseInput>
    create: XOR<SubjectAssignmentCreateWithoutCourseInput, SubjectAssignmentUncheckedCreateWithoutCourseInput>
  }

  export type SubjectAssignmentUpdateWithWhereUniqueWithoutCourseInput = {
    where: SubjectAssignmentWhereUniqueInput
    data: XOR<SubjectAssignmentUpdateWithoutCourseInput, SubjectAssignmentUncheckedUpdateWithoutCourseInput>
  }

  export type SubjectAssignmentUpdateManyWithWhereWithoutCourseInput = {
    where: SubjectAssignmentScalarWhereInput
    data: XOR<SubjectAssignmentUpdateManyMutationInput, SubjectAssignmentUncheckedUpdateManyWithoutCourseInput>
  }

  export type SubjectAssignmentCreateWithoutSubjectInput = {
    teacher: TeacherCreateNestedOneWithoutAssignmentsInput
    course: CourseCreateNestedOneWithoutAssignmentsInput
    academicYear: AcademicYearCreateNestedOneWithoutAssignmentsInput
  }

  export type SubjectAssignmentUncheckedCreateWithoutSubjectInput = {
    id?: number
    teacherId: number
    courseId: number
    academicYearId: number
  }

  export type SubjectAssignmentCreateOrConnectWithoutSubjectInput = {
    where: SubjectAssignmentWhereUniqueInput
    create: XOR<SubjectAssignmentCreateWithoutSubjectInput, SubjectAssignmentUncheckedCreateWithoutSubjectInput>
  }

  export type SubjectAssignmentCreateManySubjectInputEnvelope = {
    data: SubjectAssignmentCreateManySubjectInput | SubjectAssignmentCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type GradeCreateWithoutSubjectInput = {
    score: number
    period: number
    updatedAt?: Date | string
    enrollment: EnrollmentCreateNestedOneWithoutGradesInput
  }

  export type GradeUncheckedCreateWithoutSubjectInput = {
    id?: number
    score: number
    period: number
    enrollmentId: number
    updatedAt?: Date | string
  }

  export type GradeCreateOrConnectWithoutSubjectInput = {
    where: GradeWhereUniqueInput
    create: XOR<GradeCreateWithoutSubjectInput, GradeUncheckedCreateWithoutSubjectInput>
  }

  export type GradeCreateManySubjectInputEnvelope = {
    data: GradeCreateManySubjectInput | GradeCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type SubjectAssignmentUpsertWithWhereUniqueWithoutSubjectInput = {
    where: SubjectAssignmentWhereUniqueInput
    update: XOR<SubjectAssignmentUpdateWithoutSubjectInput, SubjectAssignmentUncheckedUpdateWithoutSubjectInput>
    create: XOR<SubjectAssignmentCreateWithoutSubjectInput, SubjectAssignmentUncheckedCreateWithoutSubjectInput>
  }

  export type SubjectAssignmentUpdateWithWhereUniqueWithoutSubjectInput = {
    where: SubjectAssignmentWhereUniqueInput
    data: XOR<SubjectAssignmentUpdateWithoutSubjectInput, SubjectAssignmentUncheckedUpdateWithoutSubjectInput>
  }

  export type SubjectAssignmentUpdateManyWithWhereWithoutSubjectInput = {
    where: SubjectAssignmentScalarWhereInput
    data: XOR<SubjectAssignmentUpdateManyMutationInput, SubjectAssignmentUncheckedUpdateManyWithoutSubjectInput>
  }

  export type GradeUpsertWithWhereUniqueWithoutSubjectInput = {
    where: GradeWhereUniqueInput
    update: XOR<GradeUpdateWithoutSubjectInput, GradeUncheckedUpdateWithoutSubjectInput>
    create: XOR<GradeCreateWithoutSubjectInput, GradeUncheckedCreateWithoutSubjectInput>
  }

  export type GradeUpdateWithWhereUniqueWithoutSubjectInput = {
    where: GradeWhereUniqueInput
    data: XOR<GradeUpdateWithoutSubjectInput, GradeUncheckedUpdateWithoutSubjectInput>
  }

  export type GradeUpdateManyWithWhereWithoutSubjectInput = {
    where: GradeScalarWhereInput
    data: XOR<GradeUpdateManyMutationInput, GradeUncheckedUpdateManyWithoutSubjectInput>
  }

  export type GradeScalarWhereInput = {
    AND?: GradeScalarWhereInput | GradeScalarWhereInput[]
    OR?: GradeScalarWhereInput[]
    NOT?: GradeScalarWhereInput | GradeScalarWhereInput[]
    id?: IntFilter<"Grade"> | number
    score?: IntFilter<"Grade"> | number
    period?: IntFilter<"Grade"> | number
    enrollmentId?: IntFilter<"Grade"> | number
    subjectId?: IntFilter<"Grade"> | number
    updatedAt?: DateTimeFilter<"Grade"> | Date | string
  }

  export type EnrollmentCreateWithoutAcademicYearInput = {
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutEnrollmentsInput
    course: CourseCreateNestedOneWithoutEnrollmentsInput
    grades?: GradeCreateNestedManyWithoutEnrollmentInput
  }

  export type EnrollmentUncheckedCreateWithoutAcademicYearInput = {
    id?: number
    studentId: number
    courseId: number
    createdAt?: Date | string
    grades?: GradeUncheckedCreateNestedManyWithoutEnrollmentInput
  }

  export type EnrollmentCreateOrConnectWithoutAcademicYearInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutAcademicYearInput, EnrollmentUncheckedCreateWithoutAcademicYearInput>
  }

  export type EnrollmentCreateManyAcademicYearInputEnvelope = {
    data: EnrollmentCreateManyAcademicYearInput | EnrollmentCreateManyAcademicYearInput[]
    skipDuplicates?: boolean
  }

  export type SubjectAssignmentCreateWithoutAcademicYearInput = {
    teacher: TeacherCreateNestedOneWithoutAssignmentsInput
    subject: SubjectCreateNestedOneWithoutAssignmentsInput
    course: CourseCreateNestedOneWithoutAssignmentsInput
  }

  export type SubjectAssignmentUncheckedCreateWithoutAcademicYearInput = {
    id?: number
    teacherId: number
    subjectId: number
    courseId: number
  }

  export type SubjectAssignmentCreateOrConnectWithoutAcademicYearInput = {
    where: SubjectAssignmentWhereUniqueInput
    create: XOR<SubjectAssignmentCreateWithoutAcademicYearInput, SubjectAssignmentUncheckedCreateWithoutAcademicYearInput>
  }

  export type SubjectAssignmentCreateManyAcademicYearInputEnvelope = {
    data: SubjectAssignmentCreateManyAcademicYearInput | SubjectAssignmentCreateManyAcademicYearInput[]
    skipDuplicates?: boolean
  }

  export type EnrollmentUpsertWithWhereUniqueWithoutAcademicYearInput = {
    where: EnrollmentWhereUniqueInput
    update: XOR<EnrollmentUpdateWithoutAcademicYearInput, EnrollmentUncheckedUpdateWithoutAcademicYearInput>
    create: XOR<EnrollmentCreateWithoutAcademicYearInput, EnrollmentUncheckedCreateWithoutAcademicYearInput>
  }

  export type EnrollmentUpdateWithWhereUniqueWithoutAcademicYearInput = {
    where: EnrollmentWhereUniqueInput
    data: XOR<EnrollmentUpdateWithoutAcademicYearInput, EnrollmentUncheckedUpdateWithoutAcademicYearInput>
  }

  export type EnrollmentUpdateManyWithWhereWithoutAcademicYearInput = {
    where: EnrollmentScalarWhereInput
    data: XOR<EnrollmentUpdateManyMutationInput, EnrollmentUncheckedUpdateManyWithoutAcademicYearInput>
  }

  export type SubjectAssignmentUpsertWithWhereUniqueWithoutAcademicYearInput = {
    where: SubjectAssignmentWhereUniqueInput
    update: XOR<SubjectAssignmentUpdateWithoutAcademicYearInput, SubjectAssignmentUncheckedUpdateWithoutAcademicYearInput>
    create: XOR<SubjectAssignmentCreateWithoutAcademicYearInput, SubjectAssignmentUncheckedCreateWithoutAcademicYearInput>
  }

  export type SubjectAssignmentUpdateWithWhereUniqueWithoutAcademicYearInput = {
    where: SubjectAssignmentWhereUniqueInput
    data: XOR<SubjectAssignmentUpdateWithoutAcademicYearInput, SubjectAssignmentUncheckedUpdateWithoutAcademicYearInput>
  }

  export type SubjectAssignmentUpdateManyWithWhereWithoutAcademicYearInput = {
    where: SubjectAssignmentScalarWhereInput
    data: XOR<SubjectAssignmentUpdateManyMutationInput, SubjectAssignmentUncheckedUpdateManyWithoutAcademicYearInput>
  }

  export type StudentCreateWithoutEnrollmentsInput = {
    rude: string
    firstName: string
    lastName: string
    birthDate?: Date | string | null
  }

  export type StudentUncheckedCreateWithoutEnrollmentsInput = {
    id?: number
    rude: string
    firstName: string
    lastName: string
    birthDate?: Date | string | null
  }

  export type StudentCreateOrConnectWithoutEnrollmentsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutEnrollmentsInput, StudentUncheckedCreateWithoutEnrollmentsInput>
  }

  export type CourseCreateWithoutEnrollmentsInput = {
    level: string
    parallel: string
    assignments?: SubjectAssignmentCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutEnrollmentsInput = {
    id?: number
    level: string
    parallel: string
    assignments?: SubjectAssignmentUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutEnrollmentsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
  }

  export type AcademicYearCreateWithoutEnrollmentsInput = {
    year: number
    assignments?: SubjectAssignmentCreateNestedManyWithoutAcademicYearInput
  }

  export type AcademicYearUncheckedCreateWithoutEnrollmentsInput = {
    id?: number
    year: number
    assignments?: SubjectAssignmentUncheckedCreateNestedManyWithoutAcademicYearInput
  }

  export type AcademicYearCreateOrConnectWithoutEnrollmentsInput = {
    where: AcademicYearWhereUniqueInput
    create: XOR<AcademicYearCreateWithoutEnrollmentsInput, AcademicYearUncheckedCreateWithoutEnrollmentsInput>
  }

  export type GradeCreateWithoutEnrollmentInput = {
    score: number
    period: number
    updatedAt?: Date | string
    subject: SubjectCreateNestedOneWithoutGradesInput
  }

  export type GradeUncheckedCreateWithoutEnrollmentInput = {
    id?: number
    score: number
    period: number
    subjectId: number
    updatedAt?: Date | string
  }

  export type GradeCreateOrConnectWithoutEnrollmentInput = {
    where: GradeWhereUniqueInput
    create: XOR<GradeCreateWithoutEnrollmentInput, GradeUncheckedCreateWithoutEnrollmentInput>
  }

  export type GradeCreateManyEnrollmentInputEnvelope = {
    data: GradeCreateManyEnrollmentInput | GradeCreateManyEnrollmentInput[]
    skipDuplicates?: boolean
  }

  export type StudentUpsertWithoutEnrollmentsInput = {
    update: XOR<StudentUpdateWithoutEnrollmentsInput, StudentUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<StudentCreateWithoutEnrollmentsInput, StudentUncheckedCreateWithoutEnrollmentsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutEnrollmentsInput, StudentUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type StudentUpdateWithoutEnrollmentsInput = {
    rude?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentUncheckedUpdateWithoutEnrollmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    rude?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CourseUpsertWithoutEnrollmentsInput = {
    update: XOR<CourseUpdateWithoutEnrollmentsInput, CourseUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<CourseCreateWithoutEnrollmentsInput, CourseUncheckedCreateWithoutEnrollmentsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutEnrollmentsInput, CourseUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type CourseUpdateWithoutEnrollmentsInput = {
    level?: StringFieldUpdateOperationsInput | string
    parallel?: StringFieldUpdateOperationsInput | string
    assignments?: SubjectAssignmentUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutEnrollmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    parallel?: StringFieldUpdateOperationsInput | string
    assignments?: SubjectAssignmentUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type AcademicYearUpsertWithoutEnrollmentsInput = {
    update: XOR<AcademicYearUpdateWithoutEnrollmentsInput, AcademicYearUncheckedUpdateWithoutEnrollmentsInput>
    create: XOR<AcademicYearCreateWithoutEnrollmentsInput, AcademicYearUncheckedCreateWithoutEnrollmentsInput>
    where?: AcademicYearWhereInput
  }

  export type AcademicYearUpdateToOneWithWhereWithoutEnrollmentsInput = {
    where?: AcademicYearWhereInput
    data: XOR<AcademicYearUpdateWithoutEnrollmentsInput, AcademicYearUncheckedUpdateWithoutEnrollmentsInput>
  }

  export type AcademicYearUpdateWithoutEnrollmentsInput = {
    year?: IntFieldUpdateOperationsInput | number
    assignments?: SubjectAssignmentUpdateManyWithoutAcademicYearNestedInput
  }

  export type AcademicYearUncheckedUpdateWithoutEnrollmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    assignments?: SubjectAssignmentUncheckedUpdateManyWithoutAcademicYearNestedInput
  }

  export type GradeUpsertWithWhereUniqueWithoutEnrollmentInput = {
    where: GradeWhereUniqueInput
    update: XOR<GradeUpdateWithoutEnrollmentInput, GradeUncheckedUpdateWithoutEnrollmentInput>
    create: XOR<GradeCreateWithoutEnrollmentInput, GradeUncheckedCreateWithoutEnrollmentInput>
  }

  export type GradeUpdateWithWhereUniqueWithoutEnrollmentInput = {
    where: GradeWhereUniqueInput
    data: XOR<GradeUpdateWithoutEnrollmentInput, GradeUncheckedUpdateWithoutEnrollmentInput>
  }

  export type GradeUpdateManyWithWhereWithoutEnrollmentInput = {
    where: GradeScalarWhereInput
    data: XOR<GradeUpdateManyMutationInput, GradeUncheckedUpdateManyWithoutEnrollmentInput>
  }

  export type TeacherCreateWithoutAssignmentsInput = {
    firstName: string
    lastName: string
    user: UserCreateNestedOneWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    userId: number
    firstName: string
    lastName: string
  }

  export type TeacherCreateOrConnectWithoutAssignmentsInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutAssignmentsInput, TeacherUncheckedCreateWithoutAssignmentsInput>
  }

  export type SubjectCreateWithoutAssignmentsInput = {
    name: string
    grades?: GradeCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    name: string
    grades?: GradeUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutAssignmentsInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutAssignmentsInput, SubjectUncheckedCreateWithoutAssignmentsInput>
  }

  export type CourseCreateWithoutAssignmentsInput = {
    level: string
    parallel: string
    enrollments?: EnrollmentCreateNestedManyWithoutCourseInput
  }

  export type CourseUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    level: string
    parallel: string
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutCourseInput
  }

  export type CourseCreateOrConnectWithoutAssignmentsInput = {
    where: CourseWhereUniqueInput
    create: XOR<CourseCreateWithoutAssignmentsInput, CourseUncheckedCreateWithoutAssignmentsInput>
  }

  export type AcademicYearCreateWithoutAssignmentsInput = {
    year: number
    enrollments?: EnrollmentCreateNestedManyWithoutAcademicYearInput
  }

  export type AcademicYearUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    year: number
    enrollments?: EnrollmentUncheckedCreateNestedManyWithoutAcademicYearInput
  }

  export type AcademicYearCreateOrConnectWithoutAssignmentsInput = {
    where: AcademicYearWhereUniqueInput
    create: XOR<AcademicYearCreateWithoutAssignmentsInput, AcademicYearUncheckedCreateWithoutAssignmentsInput>
  }

  export type TeacherUpsertWithoutAssignmentsInput = {
    update: XOR<TeacherUpdateWithoutAssignmentsInput, TeacherUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<TeacherCreateWithoutAssignmentsInput, TeacherUncheckedCreateWithoutAssignmentsInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutAssignmentsInput, TeacherUncheckedUpdateWithoutAssignmentsInput>
  }

  export type TeacherUpdateWithoutAssignmentsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
  }

  export type SubjectUpsertWithoutAssignmentsInput = {
    update: XOR<SubjectUpdateWithoutAssignmentsInput, SubjectUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<SubjectCreateWithoutAssignmentsInput, SubjectUncheckedCreateWithoutAssignmentsInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutAssignmentsInput, SubjectUncheckedUpdateWithoutAssignmentsInput>
  }

  export type SubjectUpdateWithoutAssignmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    grades?: GradeUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    grades?: GradeUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type CourseUpsertWithoutAssignmentsInput = {
    update: XOR<CourseUpdateWithoutAssignmentsInput, CourseUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<CourseCreateWithoutAssignmentsInput, CourseUncheckedCreateWithoutAssignmentsInput>
    where?: CourseWhereInput
  }

  export type CourseUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: CourseWhereInput
    data: XOR<CourseUpdateWithoutAssignmentsInput, CourseUncheckedUpdateWithoutAssignmentsInput>
  }

  export type CourseUpdateWithoutAssignmentsInput = {
    level?: StringFieldUpdateOperationsInput | string
    parallel?: StringFieldUpdateOperationsInput | string
    enrollments?: EnrollmentUpdateManyWithoutCourseNestedInput
  }

  export type CourseUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: StringFieldUpdateOperationsInput | string
    parallel?: StringFieldUpdateOperationsInput | string
    enrollments?: EnrollmentUncheckedUpdateManyWithoutCourseNestedInput
  }

  export type AcademicYearUpsertWithoutAssignmentsInput = {
    update: XOR<AcademicYearUpdateWithoutAssignmentsInput, AcademicYearUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<AcademicYearCreateWithoutAssignmentsInput, AcademicYearUncheckedCreateWithoutAssignmentsInput>
    where?: AcademicYearWhereInput
  }

  export type AcademicYearUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: AcademicYearWhereInput
    data: XOR<AcademicYearUpdateWithoutAssignmentsInput, AcademicYearUncheckedUpdateWithoutAssignmentsInput>
  }

  export type AcademicYearUpdateWithoutAssignmentsInput = {
    year?: IntFieldUpdateOperationsInput | number
    enrollments?: EnrollmentUpdateManyWithoutAcademicYearNestedInput
  }

  export type AcademicYearUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    year?: IntFieldUpdateOperationsInput | number
    enrollments?: EnrollmentUncheckedUpdateManyWithoutAcademicYearNestedInput
  }

  export type EnrollmentCreateWithoutGradesInput = {
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutEnrollmentsInput
    course: CourseCreateNestedOneWithoutEnrollmentsInput
    academicYear: AcademicYearCreateNestedOneWithoutEnrollmentsInput
  }

  export type EnrollmentUncheckedCreateWithoutGradesInput = {
    id?: number
    studentId: number
    courseId: number
    academicYearId: number
    createdAt?: Date | string
  }

  export type EnrollmentCreateOrConnectWithoutGradesInput = {
    where: EnrollmentWhereUniqueInput
    create: XOR<EnrollmentCreateWithoutGradesInput, EnrollmentUncheckedCreateWithoutGradesInput>
  }

  export type SubjectCreateWithoutGradesInput = {
    name: string
    assignments?: SubjectAssignmentCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutGradesInput = {
    id?: number
    name: string
    assignments?: SubjectAssignmentUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutGradesInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutGradesInput, SubjectUncheckedCreateWithoutGradesInput>
  }

  export type EnrollmentUpsertWithoutGradesInput = {
    update: XOR<EnrollmentUpdateWithoutGradesInput, EnrollmentUncheckedUpdateWithoutGradesInput>
    create: XOR<EnrollmentCreateWithoutGradesInput, EnrollmentUncheckedCreateWithoutGradesInput>
    where?: EnrollmentWhereInput
  }

  export type EnrollmentUpdateToOneWithWhereWithoutGradesInput = {
    where?: EnrollmentWhereInput
    data: XOR<EnrollmentUpdateWithoutGradesInput, EnrollmentUncheckedUpdateWithoutGradesInput>
  }

  export type EnrollmentUpdateWithoutGradesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutEnrollmentsNestedInput
    course?: CourseUpdateOneRequiredWithoutEnrollmentsNestedInput
    academicYear?: AcademicYearUpdateOneRequiredWithoutEnrollmentsNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutGradesInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectUpsertWithoutGradesInput = {
    update: XOR<SubjectUpdateWithoutGradesInput, SubjectUncheckedUpdateWithoutGradesInput>
    create: XOR<SubjectCreateWithoutGradesInput, SubjectUncheckedCreateWithoutGradesInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutGradesInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutGradesInput, SubjectUncheckedUpdateWithoutGradesInput>
  }

  export type SubjectUpdateWithoutGradesInput = {
    name?: StringFieldUpdateOperationsInput | string
    assignments?: SubjectAssignmentUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutGradesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    assignments?: SubjectAssignmentUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectAssignmentCreateManyTeacherInput = {
    id?: number
    subjectId: number
    courseId: number
    academicYearId: number
  }

  export type SubjectAssignmentUpdateWithoutTeacherInput = {
    subject?: SubjectUpdateOneRequiredWithoutAssignmentsNestedInput
    course?: CourseUpdateOneRequiredWithoutAssignmentsNestedInput
    academicYear?: AcademicYearUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type SubjectAssignmentUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
  }

  export type SubjectAssignmentUncheckedUpdateManyWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
  }

  export type EnrollmentCreateManyStudentInput = {
    id?: number
    courseId: number
    academicYearId: number
    createdAt?: Date | string
  }

  export type EnrollmentUpdateWithoutStudentInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    course?: CourseUpdateOneRequiredWithoutEnrollmentsNestedInput
    academicYear?: AcademicYearUpdateOneRequiredWithoutEnrollmentsNestedInput
    grades?: GradeUpdateManyWithoutEnrollmentNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    grades?: GradeUncheckedUpdateManyWithoutEnrollmentNestedInput
  }

  export type EnrollmentUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateManyCourseInput = {
    id?: number
    studentId: number
    academicYearId: number
    createdAt?: Date | string
  }

  export type SubjectAssignmentCreateManyCourseInput = {
    id?: number
    teacherId: number
    subjectId: number
    academicYearId: number
  }

  export type EnrollmentUpdateWithoutCourseInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutEnrollmentsNestedInput
    academicYear?: AcademicYearUpdateOneRequiredWithoutEnrollmentsNestedInput
    grades?: GradeUpdateManyWithoutEnrollmentNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    grades?: GradeUncheckedUpdateManyWithoutEnrollmentNestedInput
  }

  export type EnrollmentUncheckedUpdateManyWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectAssignmentUpdateWithoutCourseInput = {
    teacher?: TeacherUpdateOneRequiredWithoutAssignmentsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutAssignmentsNestedInput
    academicYear?: AcademicYearUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type SubjectAssignmentUncheckedUpdateWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
  }

  export type SubjectAssignmentUncheckedUpdateManyWithoutCourseInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
  }

  export type SubjectAssignmentCreateManySubjectInput = {
    id?: number
    teacherId: number
    courseId: number
    academicYearId: number
  }

  export type GradeCreateManySubjectInput = {
    id?: number
    score: number
    period: number
    enrollmentId: number
    updatedAt?: Date | string
  }

  export type SubjectAssignmentUpdateWithoutSubjectInput = {
    teacher?: TeacherUpdateOneRequiredWithoutAssignmentsNestedInput
    course?: CourseUpdateOneRequiredWithoutAssignmentsNestedInput
    academicYear?: AcademicYearUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type SubjectAssignmentUncheckedUpdateWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
  }

  export type SubjectAssignmentUncheckedUpdateManyWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    academicYearId?: IntFieldUpdateOperationsInput | number
  }

  export type GradeUpdateWithoutSubjectInput = {
    score?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    enrollment?: EnrollmentUpdateOneRequiredWithoutGradesNestedInput
  }

  export type GradeUncheckedUpdateWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    enrollmentId?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GradeUncheckedUpdateManyWithoutSubjectInput = {
    id?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    enrollmentId?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EnrollmentCreateManyAcademicYearInput = {
    id?: number
    studentId: number
    courseId: number
    createdAt?: Date | string
  }

  export type SubjectAssignmentCreateManyAcademicYearInput = {
    id?: number
    teacherId: number
    subjectId: number
    courseId: number
  }

  export type EnrollmentUpdateWithoutAcademicYearInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutEnrollmentsNestedInput
    course?: CourseUpdateOneRequiredWithoutEnrollmentsNestedInput
    grades?: GradeUpdateManyWithoutEnrollmentNestedInput
  }

  export type EnrollmentUncheckedUpdateWithoutAcademicYearInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    grades?: GradeUncheckedUpdateManyWithoutEnrollmentNestedInput
  }

  export type EnrollmentUncheckedUpdateManyWithoutAcademicYearInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectAssignmentUpdateWithoutAcademicYearInput = {
    teacher?: TeacherUpdateOneRequiredWithoutAssignmentsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutAssignmentsNestedInput
    course?: CourseUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type SubjectAssignmentUncheckedUpdateWithoutAcademicYearInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
  }

  export type SubjectAssignmentUncheckedUpdateManyWithoutAcademicYearInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    courseId?: IntFieldUpdateOperationsInput | number
  }

  export type GradeCreateManyEnrollmentInput = {
    id?: number
    score: number
    period: number
    subjectId: number
    updatedAt?: Date | string
  }

  export type GradeUpdateWithoutEnrollmentInput = {
    score?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subject?: SubjectUpdateOneRequiredWithoutGradesNestedInput
  }

  export type GradeUncheckedUpdateWithoutEnrollmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GradeUncheckedUpdateManyWithoutEnrollmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    period?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}