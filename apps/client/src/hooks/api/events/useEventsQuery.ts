import { Event } from '@reminders/schemas'
import keys from '@query-keys'
import {
  PaginatedQueryOpts,
  authInifiniteQueryOptions,
  useAuthInfiniteQuery,
} from '@/hooks/use-auth-infinite-query'
import { Paginated } from '@reminders/utils'
import { authFetch } from '@/lib/auth-fetch'
import { QuerySelect } from '@/hooks/types'

export const eventsQueryOptions = <TData = Event[]>(
  { offset, limit }: PaginatedQueryOpts = { offset: 0, limit: 7 },
  select?: QuerySelect<Event[], TData>,
) =>
  authInifiniteQueryOptions({
    queryKey: keys.events.paginated.key,
    initialPageParam: offset,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    queryFn: ({ pageParam }) => {
      return authFetch<Paginated<Event[]>>(
        `${keys.events.paginated.url}?offset=${pageParam}&limit=${limit}`,
      )
    },
    select,
  })

export const useEventsQuery = <TData = Event[]>(
  opts?: PaginatedQueryOpts,
  select?: QuerySelect<Event[], TData>,
) => useAuthInfiniteQuery(eventsQueryOptions(opts, select))
